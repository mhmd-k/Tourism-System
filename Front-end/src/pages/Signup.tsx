import {
  Alert,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCountries, signup } from "../RESTFunctions";
import { isEmailValid } from "../utils";
import { SignupRequest } from "../types";
import LoadingSpinner from "../components/LoadingSpinner";
import { userStore } from "../zustand/UserStore";
import CustomAsyncSelect from "../components/CustomAsyncSelect";

function Signup() {
  const [signupData, setSignupData] = useState<SignupRequest>({
    name: "",
    email: "",
    password: "",
    age: 0,
    country: "",
    gender: "Male",
  });
  const [verifyPass, setVerifyPass] = useState<string>("");
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const setUser = userStore((state) => state.setUser);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData((prevState) => ({
      ...prevState,
      age: Number(e.target.value),
    }));
  };

  const handelGenderChange = (event: SelectChangeEvent<string>) => {
    setSignupData((prevState) => ({
      ...prevState,
      gender: event.target.value,
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

    const { email, name, password, age, gender, country } = signupData;

    // if any of the field is empty
    if (!email || !name || !password || !verifyPass || !gender || !country) {
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

    // if age is less than 18
    if (age < 18) {
      setError("You must be at least 18 years old");
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

    try {
      const data = await signup(signupData);

      console.log("data: ", data);

      setUser(data.user);
      navigate("/", {
        state: `Welcome to Travel Helper "${data.user.name}",
          We are glade to have u here 😁`,
        replace: true,
      });
    } catch (err) {
      setError("some error happend please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <Stack direction={"column"} gap={3} className="login-from">
        <Typography component={"h2"} fontSize={30} textAlign={"center"}>
          Create Account
        </Typography>
        {error ? (
          <Alert
            severity="error"
            variant="filled"
            onClose={() => setError(null)}
          >
            {error}
          </Alert>
        ) : (
          <></>
        )}
        <TextField
          name="name"
          size="small"
          label="Username"
          type="text"
          variant="outlined"
          value={signupData.name}
          autoFocus
          onChange={handleChange}
        />
        <TextField
          name="email"
          size="small"
          label="Email"
          type="email"
          value={signupData.email}
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          size="small"
          label="Age"
          type="number"
          value={signupData.age}
          variant="outlined"
          onChange={handleAgeChange}
        />
        <CustomAsyncSelect
          name="country"
          label="Country"
          handleValueChange={setSignupData}
          getOptions={getCountries}
        />
        <FormControl>
          <InputLabel>Gender</InputLabel>
          <Select
            size="small"
            label="Gender"
            type="text"
            name="gender"
            value={signupData.gender}
            variant="outlined"
            onChange={handelGenderChange}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>
        </FormControl>
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
        <Button
          variant="contained"
          color="primary"
          sx={{ width: "100%" }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <LoadingSpinner /> : "Submit"}
        </Button>
        <Typography textAlign={"center"}>
          Already have an Account? <Link to={"../login"}>Login</Link>
        </Typography>
      </Stack>
    </div>
  );
}

export default Signup;
