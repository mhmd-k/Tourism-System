import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  FormControlLabel,
  Radio,
  FormLabel,
  RadioGroup,
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

const cities = [
  "Aleppo",
  "Damascus",
  "Beirut",
  "Gaza",
  "Paris",
  "London",
  "Cairo",
  "Berlin",
  "Moscow",
  "Washington",
  "New Delhi",
  "Brasília",
  "Canberra",
  "Madrid",
  "Athens",
  "Stockholm",
  "Ankara",
  "Dublin",
  "Hanoi",
  "Bangkok",
  "Mexico City",
  "Buenos Aires",
  "Nairobi",
  "Brussels",
  "Havana",
  "Jakarta",
  "Lisbon",
  "Vienna",
  "Wellington",
  "Amsterdam",
  "Oslo",
  "Budapest",
  "Warsaw",
  "Prague",
  "Helsinki",
  "Kuala Lumpur",
  "Copenhagen",
  "Manila",
  "Lima",
  "Bogotá",
  "Caracas",
  "Ljubljana",
  "Tallinn",
  "Reykjavik",
  "Belgrade",
  "Luxembourg City",
  "Dakar",
  "Minsk",
  "Tirana",
  "Santiago",
  "Kiev",
  "Lilongwe",
  "Bucharest",
  "Baku",
  "Lima",
  "Kathmandu",
  "Seoul",
  "Doha",
  "Singapore",
  "Colombo",
  "Abuja",
  "Kampala",
  "Addis Ababa",
  "Nicosia",
  "Tegucigalpa",
  "Helsinki",
  "Port Louis",
  "San Salvador",
  "Suva",
  "Georgetown",
  "Kigali",
  "Djibouti",
  "Banjul",
  "Antananarivo",
  "Port Vila",
  "Asmara",
  "Monrovia",
  "Apia",
  "Maseru",
  "Paramaribo",
  "Vaduz",
  "Basseterre",
  "Kingstown",
  "Castries",
  "Roseau",
  "Saint John's",
  "Saint George's",
  "Palikir",
  "Funafuti",
  "Ngerulmud",
  "Male",
  "Valletta",
  "Pristina",
  "Podgorica",
  "Naypyidaw",
  "Gaborone",
  "Bissau",
  "Port-au-Prince",
  "Windhoek",
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
      <h2>Answer The Following Questions</h2>
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
            {cities.map((city, i) => (
              <MenuItem value={city.toLowerCase()} key={i}>
                {city}
              </MenuItem>
            ))}
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
              inputProps={{ min: "1", max: "30" }}
              size="small"
              value={formData.numberOfPeople}
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  numberOfPeople:
                    Number(e.target.value) > 30 ? 30 : Number(e.target.value),
                }))
              }
            />
            <GroupOutlined />
          </FormControl>
          <FormControl className="generate-trip-input-container">
            <TextField
              type="number"
              label="Number of Days"
              inputProps={{ min: "1", max: "26" }}
              size="small"
              value={formData.numberOfDays}
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  numberOfDays:
                    Number(e.target.value) > 26 ? 26 : Number(e.target.value),
                }))
              }
            />
          </FormControl>
        </Stack>
        <FormControl>
          <FormLabel
            id="care-about-budget"
            sx={{ textAlign: "left", color: "var(--text-color)" }}
          >
            Do you care about budget?
          </FormLabel>
          <RadioGroup
            aria-labelledby="care-about-budget"
            sx={{ display: "flex", flexDirection: "row" }}
          >
            <FormControlLabel
              onClick={() =>
                setFormData((prevState) => ({
                  ...prevState,
                  careAboutBudget: true,
                }))
              }
              control={<Radio />}
              label="Yes"
              checked={formData.careAboutBudget === true}
            />
            <FormControlLabel
              onClick={() =>
                setFormData((prevState) => ({
                  ...prevState,
                  careAboutBudget: false,
                }))
              }
              control={<Radio />}
              label="No"
              checked={formData.careAboutBudget === false}
            />
          </RadioGroup>
        </FormControl>

        {formData.careAboutBudget ? (
          <FormControl>
            <FormLabel
              id="cheapest-trip"
              sx={{ textAlign: "left", color: "var(--text-color)" }}
            >
              Do you want the cheapest trip?
            </FormLabel>
            <RadioGroup
              aria-labelledby="cheapest-trip"
              sx={{ display: "flex", flexDirection: "row" }}
            >
              <FormControlLabel
                onClick={() =>
                  setFormData((prevState) => ({
                    ...prevState,
                    cheapestTrip: true,
                  }))
                }
                control={<Radio />}
                label="Yes"
                checked={formData.cheapestTrip === true}
              />
              <FormControlLabel
                onClick={() =>
                  setFormData((prevState) => ({
                    ...prevState,
                    cheapestTrip: false,
                  }))
                }
                control={<Radio />}
                label="No"
                checked={formData.cheapestTrip === false}
              />
            </RadioGroup>
          </FormControl>
        ) : (
          <></>
        )}

        {formData.careAboutBudget && !formData.cheapestTrip ? (
          <FormControl className="generate-trip-input-container">
            <TextField
              type="number"
              label="Total Budget in Dollars"
              inputProps={{ min: "500" }}
              size="small"
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
        ) : (
          <></>
        )}

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
