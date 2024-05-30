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
  Box,
  IconButton,
  Button,
} from "@mui/material";
import { Close, GroupOutlined, PriceChange } from "@mui/icons-material";
import { ChangeEvent, useState } from "react";
import { UserCompanion } from "../../types";
import CustomAsyncSelect from "../../components/CustomAsyncSelect";
import { getCities } from "../../RESTFunctions";
import Popup from "../../components/Popup";
import { tripInfoStore } from "../../zustand/TripInfoStore";
import UserCompanionForm from "./UserCompanionForm";

const foodTypes = [
  "Sea food",
  "Traditional",
  "Dessert",
  "Fast food",
  "Fine dinning",
];

const places = [
  { label: "Old Places", value: "oldplace" },
  { label: "Natural places", value: "naturalplace" },
  { label: "Night Places", value: "nightplace" },
  { label: "Shopping Places", value: "shoppingplace" },
];

function Survey() {
  const [isUserCompanionsPopupOpen, setIsUserCompanionPopupOpen] =
    useState(false);

  const formData = tripInfoStore((state) => state.tripInfo);
  const setFormData = tripInfoStore((state) => state.setTripInfo);

  const handleOpenClosePopup = () =>
    setIsUserCompanionPopupOpen(!isUserCompanionsPopupOpen);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setFormData({
      ...formData,
      [event.target.name]: `${event.target.value}`,
    });
  };

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      date: event.target.value,
    });
  };

  const handleMultiSelect = (
    property: "preferredFood" | "preferredPlaces",
    value: string
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

    setFormData({
      ...formData,
      [property]: arr,
    });
  };

  return (
    <>
      <h2>Answer The Following Questions</h2>
      <Stack direction={"column"} gap={2}>
        <CustomAsyncSelect
          name="fromCity"
          label="From City"
          getOptions={getCities}
        />
        <FormControl required>
          <InputLabel size="small" id="to-country">
            To Country
          </InputLabel>
          <Select
            size="small"
            label="to-country"
            sx={{ textAlign: "left" }}
            value={formData.toCountry}
            onChange={handleSelectChange}
            name="toCountry"
          >
            <MenuItem value=""></MenuItem>
            <MenuItem value="Italy">Italy</MenuItem>
          </Select>
        </FormControl>
        <FormControl required>
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
              onChange={(e) => {
                const userCompanions: UserCompanion[] = [];

                for (let i = 0; i < Number(e.target.value) - 1; i++) {
                  userCompanions.push({ age: 0, gender: "" });
                }

                setFormData({
                  ...formData,
                  numberOfPeople: Number(e.target.value),
                  userCompanions: userCompanions,
                });
              }}
              required
            />
          </FormControl>

          {/* user companions popup  */}
          {Number(formData.numberOfPeople) > 1 && (
            <>
              <IconButton
                onClick={handleOpenClosePopup}
                sx={{ bgcolor: "var(--green-color)", color: "white" }}
              >
                <GroupOutlined />
              </IconButton>
              <Popup
                isOpen={isUserCompanionsPopupOpen}
                handleOpenClose={handleOpenClosePopup}
              >
                <Box className="popup">
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <h3>Your Companions Info:</h3>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={handleOpenClosePopup}
                      className="close-btn"
                    >
                      <Close />
                    </Button>
                  </Stack>
                  {formData.userCompanions?.map((user, i) => (
                    <UserCompanionForm user={user} i={i} key={i} />
                  ))}
                </Box>
              </Popup>
            </>
          )}

          <FormControl className="generate-trip-input-container">
            <TextField
              type="number"
              label="Number of Days"
              inputProps={{ min: "1", max: "30" }}
              size="small"
              value={formData.numberOfDays}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  numberOfDays: Number(e.target.value),
                })
              }
              required
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
                setFormData({
                  ...formData,
                  careAboutBudget: true,
                })
              }
              control={<Radio />}
              label="Yes"
              checked={formData.careAboutBudget === true}
            />
            <FormControlLabel
              onClick={() =>
                setFormData({
                  ...formData,
                  careAboutBudget: false,
                })
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
                  setFormData({
                    ...formData,
                    cheapestTrip: true,
                  })
                }
                control={<Radio />}
                label="Yes"
                checked={formData.cheapestTrip === true}
              />
              <FormControlLabel
                onClick={() =>
                  setFormData({
                    ...formData,
                    cheapestTrip: false,
                  })
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
                setFormData({
                  ...formData,
                  budget: Number(e.target.value),
                })
              }
            />
            <PriceChange />
          </FormControl>
        ) : (
          <></>
        )}

        <FormControl>
          <InputLabel size="small" id="preferred-food">
            Prefered Food
          </InputLabel>
          <Select
            label="preferred-food"
            size="small"
            multiple
            value={formData.preferredFood}
          >
            {foodTypes.map((e, i) => (
              <MenuItem
                value={e}
                key={`${e} . ${i}`}
                onClick={() => handleMultiSelect("preferredFood", e)}
              >
                {e}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel size="small" id="preferred-places">
            Preferred Places
          </InputLabel>
          <Select
            size="small"
            label="preferred-places"
            sx={{ textAlign: "left" }}
            multiple
            value={formData.preferredPlaces}
          >
            {places.map((e, i) => (
              <MenuItem
                value={e.value}
                key={`${e} . ${i}`}
                onClick={() => handleMultiSelect("preferredPlaces", e.value)}
              >
                {e.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </>
  );
}

export default Survey;
