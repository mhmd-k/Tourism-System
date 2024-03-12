import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { userStore } from "../zustand/UserStore";
import { Navigate } from "react-router-dom";
import { useRef } from "react";

function UserProfile() {
  const user = userStore((state) => state.user);

  const fileInputRef = useRef<null | HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  if (!user) {
    return (
      <Navigate
        to={"../login"}
        state={"You Must Be Logged In First"}
        replace={true}
      />
    );
  }

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Stack direction={"column"} className="lg-w-50">
        <Stack
          alignItems={"center"}
          justifyContent={"space-evenly"}
          direction={"row"}
          gap={2}
          padding={2}
        >
          <Avatar
            sx={{
              bgcolor: "#607d8b",
              width: "120px",
              height: "120px",
              alignSelf: "start",
            }}
          >
            {user.name[0].toUpperCase()}
          </Avatar>
          <Stack gap={2}>
            {user.image ? (
              <Button
                size="small"
                variant="outlined"
                color="info"
                onClick={handleClick}
              >
                Change Picture
              </Button>
            ) : (
              <></>
            )}
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={handleClick}
            >
              {user.image ? "Remove Picture" : "Upload Picture"}
            </Button>
            <input type="file" hidden={true} ref={fileInputRef} />
          </Stack>
        </Stack>
        <Stack gap={2}>
          <TextField
            placeholder="Username"
            disabled
            value={user.name}
            size="small"
            label="username"
          />
          <TextField
            placeholder="Email"
            disabled
            value={user.email}
            size="small"
            label="email"
          />
        </Stack>
        <Typography
          component={"h3"}
          sx={{
            margin: "20px 0",
            textAlign: "left",
          }}
        >
          Change Password:
        </Typography>
        <TextField
          id="password"
          placeholder="New Password"
          type="password"
          label="New Password"
        />
        <Button variant="contained" color="success">
          Save
        </Button>
      </Stack>
    </Container>
  );
}

export default UserProfile;
