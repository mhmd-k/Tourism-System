import { Button, Stack, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="login">
      <Stack direction={"column"} gap={4} className="login-from">
        <Typography component={"h2"} fontSize={30} textAlign={"center"}>
          Login To Your Account
        </Typography>
        <TextField label="Email" autoFocus type="email" variant="outlined" />
        <TextField label="Password" type="password" variant="outlined" />
        <Button variant="contained" color="primary" sx={{ width: "100%" }}>
          Login
        </Button>
        <Typography textAlign={"center"}>
          Not a member? <Link to={"../signup"}>Create Account</Link>
        </Typography>
      </Stack>
    </div>
  );
}

export default Login;
