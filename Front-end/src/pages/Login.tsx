import {
  Alert,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LoginRequest, UserResponse, UserResponseError } from "../types";
import { isEmailValid } from "../utils";
import { Email, Error } from "@mui/icons-material";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import IconButton from "@mui/material/IconButton";
import LoadingSpinner from "../components/LoadingSpinner";
import { login } from "../RESTFunctions";
import { userStore } from "../zustand/UserStore";

function Login() {
  const [loginData, setLoginData] = useState<LoginRequest>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const setUser = userStore((state) => state.setUser);

  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (state) {
      setTimeout(() => {
        navigate(location.pathname, {});
      }, 6000);
    }
  }, [navigate, state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    if (!loginData.email || !loginData.password) {
      setError("Please fill all the fields");
      setLoading(false);
      return;
    }

    if (!isEmailValid(loginData.email)) {
      setError("Please enter a valid email");
      setLoading(false);
      return;
    }

    const res = await login(loginData);

    if ((res as UserResponse).status === 200) {
      if ((res as UserResponse).data.user.image) {
        setUser({
          ...(res as UserResponse).data.user,
          // http://localhost:8000/storage/profile_pictures/picture
          image: `http://localhost:8000/storage/${(res as UserResponse).data.user.image?.slice(7)}`,
        });
      } else {
        setUser((res as UserResponse).data.user);
      }

      navigate("/", {
        state: `Welcome Back "${(res as UserResponse).data.user.name}",
          We are glade to have u here 😁`,
        replace: true,
      });
    } else {
      setError((res as UserResponseError).response.data.message);
    }

    setLoading(false);
  };

  return (
    <div className="login">
      <Stack direction={"column"} gap={4} className="login-from">
        {state ? (
          <Alert color="warning" icon={<Error />}>
            {state}
          </Alert>
        ) : (
          <></>
        )}
        <Typography component={"h2"} fontSize={30} textAlign={"center"}>
          Login To Your Account
        </Typography>
        {error ? (
          <Typography
            className="bold"
            component={"p"}
            fontSize={15}
            textAlign={"center"}
            color={"red"}
            style={{
              border: "2px solid red",
              padding: 10,
              borderRadius: 2,
            }}
          >
            {error}
          </Typography>
        ) : (
          <></>
        )}
        <FormControl variant="outlined">
          <InputLabel htmlFor="email">Email</InputLabel>
          <OutlinedInput
            value={loginData.email}
            onChange={handleChange}
            name="email"
            id="email"
            endAdornment={
              <InputAdornment position="end">
                <Email color="info" />
              </InputAdornment>
            }
            label="Email"
          />
        </FormControl>
        <FormControl variant="outlined">
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            value={loginData.password}
            onChange={handleChange}
            name="password"
            id="password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <LockOpenIcon color="info" />
                  ) : (
                    <LockIcon color="info" />
                  )}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          sx={{ width: "100%" }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <LoadingSpinner size={20} /> : "Login"}
        </Button>
        <Typography textAlign={"center"}>
          Not a member? <Link to={"../signup"}>Create Account</Link>
        </Typography>
      </Stack>
    </div>
  );
}

export default Login;
