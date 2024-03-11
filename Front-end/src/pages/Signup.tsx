import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../RESTFunctions";
import { isEmailValid } from "../utils";
import { SignupError, SignupRequest, SignupResponse, User } from "../types";
import Spinner from "../components/Spinner";
import { userStore } from "../zustand/UserStore";

function Signup() {
  const [signupData, setSignupData] = useState<SignupRequest>({
    name: "",
    email: "",
    password: "",
  });
  const [verifyPass, setVerifyPass] = useState<string>("");
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const setUser = userStore((state) => state.setUser);

  const navigate = useNavigate();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleVerifyPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVerifyPass(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    const { email, name, password } = signupData;

    // if any of the field is empty
    if (!email || !name || !password || !verifyPass) {
      setError("please fill all the fields");
      setLoading(false);
      return;
    }

    // if email is not valid
    if (!isEmailValid(email)) {
      setError("Please Enter a valid email");
      setLoading(false);
      return;
    }

    // if the password and confirm password are not the same
    if (verifyPass !== password) {
      setError('Password and "Confirm Password" must be the same');
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    const res = await signup(signupData);

    if ((res as SignupResponse).status === 200) {
      setUser((res as SignupResponse).data.user as User);
      navigate("/", {
        state: `Welcome to Travel Helper "${(res as SignupResponse).data.user.name}",
          We are glade to have u here 😁`,
        replace: true,
      });
    } else {
      setError((res as SignupError).response.data.message);
    }

    setLoading(false);
  };

  return (
    <div className="login">
      <Stack direction={"column"} paddingY={3} gap={3} className="login-from">
        <Typography component={"h2"} fontSize={30} textAlign={"center"}>
          Create Account
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
        <TextField
          size="small"
          label="Username"
          type="text"
          variant="outlined"
          name="name"
          value={signupData.name}
          autoFocus
          onChange={handleChange}
        />
        <TextField
          size="small"
          label="Email"
          type="email"
          name="email"
          value={signupData.email}
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          size="small"
          label="Password"
          type="password"
          name="password"
          value={signupData.password}
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          size="small"
          label="Confirm Password"
          type="password"
          value={verifyPass}
          variant="outlined"
          onChange={handleVerifyPasswordChange}
        />
        <Typography
          className="bold"
          component={"p"}
          fontSize={20}
          textAlign={"center"}
        ></Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ width: "100%" }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <Spinner /> : "Submit"}
        </Button>
        <Typography textAlign={"center"}>
          Already have an Account? <Link to={"../login"}>Login</Link>
        </Typography>
      </Stack>
    </div>
  );
}

export default Signup;
