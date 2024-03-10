import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined";
import { GroupOutlined, PriceChange } from "@mui/icons-material";
import { useState } from "react";

interface GenerateTripForm {
  foodType: Array<string>;
}

const foodTypes = [
  "Sea Food",
  "Traditional",
  "Desserts",
  "Fast Food",
  "Fine Dinning",
];

function GenerateTrip() {
  const [formData, setFormData] = useState<GenerateTripForm>({
    foodType: [],
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFoodChange = (e: any) => {
    setFormData((prevState) => ({
      foodType: [...prevState.foodType, e.target.value],
    }));
  };

  return (
    <div className="generate-trip">
      <Stack direction={"row"} sx={{ height: "100%" }}>
        <Container
          sx={{
            margin: "50px 0",
            flex: 1,
          }}
        >
          <Typography
            component={"h2"}
            fontSize={"24px"}
            align="center"
            marginBottom={"20px"}
            fontWeight={"bold"}
          >
            Answer The Following Questions
          </Typography>
          <Stack direction={"column"} gap={2}>
            <FormControl>
              <InputLabel id="from" size="small">
                From City
              </InputLabel>
              <Select size="small" label="from" sx={{ textAlign: "left" }}>
                <MenuItem value=""></MenuItem>
                <MenuItem value="Damascus">Damascus</MenuItem>
                <MenuItem value="Aleppo">Aleppo</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel size="small" id="to-country">
                To Country
              </InputLabel>
              <Select
                size="small"
                label="to-country"
                sx={{ textAlign: "left" }}
              >
                <MenuItem value=""></MenuItem>
                <MenuItem value="Italy">Italy</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <TextField
                type="number"
                label="Number of Days"
                inputProps={{ max: "10", min: "1" }}
                size="small"
              />
            </FormControl>
            <Stack direction={"row"} gap={2}>
              <FormControl className="generate-trip-input-container">
                <TextField
                  type="number"
                  label="Number of People"
                  inputProps={{ min: "1", max: "8" }}
                  size="small"
                />
                <GroupOutlined />
              </FormControl>
              <FormControl className="generate-trip-input-container">
                <TextField
                  type="number"
                  label="Total Budget in Dollars"
                  inputProps={{ min: "1" }}
                  size="small"
                />
                <PriceChange />
              </FormControl>
            </Stack>
            <FormControl>
              <InputLabel size="small" id="to-country">
                Prefered Food
              </InputLabel>
              <Select
                multiple
                size="small"
                label="to-country"
                sx={{ textAlign: "left" }}
                onChange={handleFoodChange}
                value={formData.foodType}
              >
                {foodTypes.map((e, i) => (
                  <MenuItem key={`${e},${i}`} value={e}>
                    {e}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "var(--green-color)",
                borderRadius: "5px !important",
              }}
              endIcon={<AutoFixHighOutlinedIcon />}
            >
              Generate Trip
            </Button>
          </Stack>
        </Container>
        <Container fixed className="image"></Container>
      </Stack>
    </div>
  );
}

export default GenerateTrip;
