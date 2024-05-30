import { UserCompanion } from "../../types";
import {
  FormControl,
  MenuItem,
  TextField,
  Select,
  InputLabel,
  Stack,
} from "@mui/material";
import { tripInfoStore } from "../../zustand/TripInfoStore";

function UserCompanionForm({ user, i }: { user: UserCompanion; i: number }) {
  const tripInfo = tripInfoStore((state) => state.tripInfo);
  const setTripInfo = tripInfoStore((state) => state.setTripInfo);

  return (
    <>
      <h4>Companion {i + 1}:</h4>
      <Stack direction="row" gap={2} marginBottom={2}>
        <FormControl sx={{ flexBasis: "50%" }}>
          <TextField
            label="Age"
            name={`age-${i}`}
            type="number"
            value={user.age}
            onChange={(event) =>
              setTripInfo({
                ...tripInfo,
                userCompanions: tripInfo.userCompanions?.map((e, index) =>
                  index === i ? { ...e, age: Number(event.target.value) } : e
                ),
              })
            }
          />
        </FormControl>
        <FormControl sx={{ flexBasis: "50%" }}>
          <InputLabel id={`gender-${i}`}>Gender</InputLabel>
          <Select
            label={`gender-${i}`}
            name={`gender-${i}`}
            value={user.gender}
            onChange={(event) =>
              setTripInfo({
                ...tripInfo,
                userCompanions: tripInfo.userCompanions?.map((e, index) =>
                  index === i ? { ...e, gender: event.target.value } : e
                ),
              })
            }
          >
            <MenuItem value=""></MenuItem>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </>
  );
}

export default UserCompanionForm;
