import { Button, Container, Stack, TextField } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { userStore } from "../zustand/UserStore";
import { Navigate } from "react-router-dom";

function UserProfile() {
  const user = userStore((state) => state.user);

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
    <Container sx={{ display: "flex", flexWrap: "wrap" }}>
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
            <Button size="small" variant="outlined" color="info">
              Change Picture
            </Button>
            <Button size="small" variant="contained" color="primary">
              {user.imageReferance ? "Remove Picture" : "Upload Picture"}
            </Button>
            <TextField type="file" />
          </Stack>
        </Stack>
        <Stack gap={2}>
          <TextField
            placeholder="Username"
            disabled
            value={user.name}
            size="small"
          />
          <TextField
            placeholder="Email"
            disabled
            value={user.email}
            size="small"
          />
        </Stack>
      </Stack>
      <Stack className="lg-w-50">
        <label htmlFor="password">New Password</label>
        <TextField
          id="password"
          placeholder="New Password"
          type="password"
          label="New Password"
        />
        <label htmlFor="confirm-password">Confirm Password</label>
        <TextField
          id="confirm-password"
          placeholder="Confirm Password"
          type="password"
          label="Confirm Password"
        />
        <Button className="w-full">Save</Button>
      </Stack>
    </Container>
  );
}

export default UserProfile;
