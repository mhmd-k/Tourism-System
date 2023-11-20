import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const counteryOptions = ["Syria", "Italy", "Lebanon"];

function Signup() {
  return (
    <div className="login">
      <Stack direction={"column"} paddingY={3} gap={3} className="login-from">
        <Typography component={"h2"} fontSize={30} textAlign={"center"}>
          Create Account
        </Typography>
        <TextField
          size="small"
          label="Username"
          type="text"
          variant="outlined"
          autoFocus
        />
        <FormControl fullWidth>
          <InputLabel size="small" id="country">
            Country
          </InputLabel>
          <Select size="small" label="country">
            {counteryOptions.map((e, i) => (
              <MenuItem key={`${e}-${i}`} value={e}>
                {e}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField size="small" label="Email" type="email" variant="outlined" />
        <TextField
          size="small"
          label="Password"
          type="password"
          variant="outlined"
        />
        <TextField
          size="small"
          label="Confirm Password"
          type="password"
          variant="outlined"
        />
        <Button variant="contained" color="primary" sx={{ width: "100%" }}>
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
