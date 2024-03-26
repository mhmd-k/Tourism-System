import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { userStore } from "../zustand/UserStore";
import { Navigate } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";
import { UploadImageResponse } from "../types";

function UserProfile() {
  const user = userStore((state) => state.user);
  const setImage = userStore((state) => state.setImage);

  console.log(user);

  const fileInputRef = useRef<null | HTMLInputElement>(null);

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response: UploadImageResponse = await axios.post(
          "http://localhost:8000/api/update-image",
          {
            image: formData.get("image"),
            userId: user?.id,
          },
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        console.log("response: ", response);
        if (response.status === 200) {
          if (response.data) {
            setImage(`http://localhost:8000${response.data.image}`);
          }
        }
      } catch (error) {
        console.error("Error occurred during image upload:", error);
      }
    }
  };

  const handleDeleteImage = async () => {
    try {
      const res: UploadImageResponse = await axios.put(
        "http://localhost:8000/api/delete-image",
        { userId: user.id }
      );

      console.log("Delete Image response: ", res);
      if (res.status === 200) {
        setImage(null);
      }
    } catch (error) {
      console.error("Error occurred during image delete:", error);
    }
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
          {user.image ? (
            <div className="profile-image">
              <img src={user.image} alt="" />
            </div>
          ) : (
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
          )}
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
            {user.image ? (
              <Button
                size="small"
                variant="contained"
                color="error"
                onClick={handleDeleteImage}
              >
                Remove Picture
              </Button>
            ) : (
              <Button
                size="small"
                variant="contained"
                color={"primary"}
                onClick={handleClick}
              >
                Upload Picture
              </Button>
            )}
            <input
              type="file"
              hidden={true}
              ref={fileInputRef}
              onChange={handleImageChange}
            />
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
          sx={{ paddingBottom: 2 }}
        />
        <Button variant="contained" color="success">
          Save Password
        </Button>
      </Stack>
    </Container>
  );
}

export default UserProfile;
