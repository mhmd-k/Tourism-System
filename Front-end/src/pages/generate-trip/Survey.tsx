import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { GroupOutlined, PriceChange } from "@mui/icons-material";
import { ChangeEvent } from "react";
import { GenerateTripData } from "../../types";

const foodTypes = [
  "Sea food",
  "Traditional",
  "Dessert",
  "Fast food",
  "Fine dinning",
];

const places = [
  "Old Places",
  "Natural places",
  "Night Places",
  "Shopping Places",
];

function Survey({
  setFormData,
  formData,
}: {
  setFormData: React.Dispatch<React.SetStateAction<GenerateTripData>>;
  formData: GenerateTripData;
}) {
  const handelSelectChange = (event: SelectChangeEvent<string>) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: `${event.target.value}`,
    }));
  };

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      date: event.target.value,
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

  return (
    <>
      <Typography
        component={"h2"}
        fontSize={22}
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
            type="date"
            size="small"
            inputProps={{ min: new Date().toISOString().split("T")[0] }}
            value={formData.date}
            onChange={handleDateChange}
          ></TextField>
        </FormControl>
        <Stack direction={"row"} gap={2}>
          <FormControl className="generate-trip-input-container">
            <TextField
              type="number"
              label="Number of People"
              inputProps={{ min: "1", max: "8" }}
              size="small"
              value={formData.numberOfPeople}
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  numberOfPeople:
                    Number(e.target.value) > 8 ? 8 : Number(e.target.value),
                }))
              }
            />
            <GroupOutlined />
          </FormControl>
          <FormControl className="generate-trip-input-container">
            <TextField
              type="number"
              label="Number of Days"
              inputProps={{ min: "1" }}
              size="small"
              value={formData.numberOfDays}
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  numberOfDays: Number(e.target.value),
                }))
              }
            />
          </FormControl>
        </Stack>
        <FormControl className="generate-trip-input-container">
          <TextField
            type="number"
            label="Total Budget in Dollars"
            inputProps={{ min: "1000" }}
            size="small"
            disabled={!formData.careAboutBudget}
            value={formData.budget}
            onChange={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                budget: Number(e.target.value),
              }))
            }
          />
          <PriceChange />
        </FormControl>
        <FormControlLabel
          control={
            <Checkbox
              checked={!formData.careAboutBudget}
              onChange={() =>
                setFormData((prevData) => ({
                  ...prevData,
                  careAboutBudget: !prevData.careAboutBudget,
                }))
              }
            />
          }
          label="Doesn't care about budget"
        />
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
      </Stack>
    </>
  );
}

export default Survey;
