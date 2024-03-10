import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../RESTFunctions";
import { isEmailValid } from "../utils";
import { Response } from "../types";

function Signup() {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [verifyPass, setVerifyPass] = useState("");
  const [error, setError] = useState<null | Response>(null);
  // const [loading, setLoading] = useState(false);

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
    setError(null);
    const { email, name, password } = signupData;

    // if any of the field is empty
    if (!email || !name || !password || !verifyPass) {
      setError({ message: "please fill all the fields", status: 0 });
      return;
    }

    // if email is not valid
    if (!isEmailValid(email)) {
      setError({ message: "Please Enter a valid email", status: 0 });
      return;
    }

    // if the password and confirm password are not the same
    if (verifyPass !== password) {
      setError({
        message: 'Password and "Confirm Password" must be the same',
        status: 0,
      });
      return;
    }

    if (password.length < 8) {
      setError({
        message: "Password must be at least 8 characters",
        status: 0,
      });
      return;
    }

    try {
      const res = await signup(signupData);

      if (res.status === 200) {
        console.log("success");
      }
    } catch (err) {
      setError(err as Response);
    }
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
            {error.message}
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
        >
          Submit
        </Button>
        <Typography textAlign={"center"}>
          Already have an Account? <Link to={"../login"}>Login</Link>
        </Typography>
      </Stack>
    </div>
  );
}

export default Signup;
