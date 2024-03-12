import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined";
import { GroupOutlined, PriceChange } from "@mui/icons-material";
import { useState } from "react";
import { GenerateTripData } from "../types";
import { validateTripInfo } from "../utils";
import Spinner from "../components/Spinner";

const foodTypes = [
  "Sea Food",
  "Traditional",
  "Desserts",
  "Fast Food",
  "Fine Dinning",
];

const places = ["Old Places", "Natural places", "Night Places", "Shopping"];

function GenerateTrip() {
  const [formData, setFormData] = useState<GenerateTripData>({
    toCountry: "",
    fromCity: "",
    numberOfDays: 0,
    numberOfPeople: 0,
    budget: 0,
    preferredFood: [],
    preferredPlaces: [],
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handelSelectChange = (event: SelectChangeEvent<string>) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: `${event.target.value}`,
    }));
  };

  const handleMultiSelect = (
    value: string,
    property: "preferredFood" | "preferredPlaces"
  ) => {
    let arr =
      property === "preferredFood"
        ? formData.preferredFood
        : formData.preferredPlaces;

    const isElementInsideArray = arr.find((element) => element === value);

    if (isElementInsideArray) {
      arr = arr.filter((e) => e !== value);
    } else {
      arr = [...arr, value];
    }

    setFormData((prevState) => ({
      ...prevState,
      [property]: arr,
    }));
  };

  const handleSubmit = () => {
    setIsLoading(true);
    const err = validateTripInfo(formData);

    if (err) {
      setError(err);
      setIsLoading(false);
      return;
    }

    // TODO: Make API call

    setIsLoading(false);
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
            fontSize={22}
            align="center"
            marginBottom={"20px"}
            fontWeight={"bold"}
          >
            Answer The Following Questions
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
          <Stack direction={"column"} gap={2}>
            <FormControl>
              <InputLabel id="from" size="small">
                From City
              </InputLabel>
              <Select
                size="small"
                label="from"
                sx={{ textAlign: "left" }}
                value={formData.fromCity}
                onChange={handelSelectChange}
                name="fromCity"
              >
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
                value={formData.toCountry}
                onChange={handelSelectChange}
                name="toCountry"
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
                value={formData.numberOfDays}
                onChange={(e) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    numberOfDays:
                      Number(e.target.value) > 10 ? 10 : Number(e.target.value),
                  }))
                }
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
                label="to-country"
                size="small"
                multiple
                value={formData.preferredFood}
              >
                {foodTypes.map((e, i) => (
                  <MenuItem
                    value={e}
                    key={`${e} . ${i}`}
                    onClick={() => handleMultiSelect(e, "preferredFood")}
                  >
                    {e}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel size="small" id="to-country">
                Prefered Places
              </InputLabel>
              <Select
                size="small"
                label="to-country"
                sx={{ textAlign: "left" }}
                multiple
                value={formData.preferredPlaces}
              >
                {places.map((e, i) => (
                  <MenuItem
                    value={e}
                    key={`${e} . ${i}`}
                    onClick={() => handleMultiSelect(e, "preferredPlaces")}
                  >
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
              endIcon={isLoading ? <></> : <AutoFixHighOutlinedIcon />}
              disabled={isLoading}
              onClick={handleSubmit}
            >
              {isLoading ? <Spinner /> : "Generate Trip"}
            </Button>
          </Stack>
        </Container>
        <Container fixed className="image"></Container>
      </Stack>
    </div>
  );
}

export default GenerateTrip;
