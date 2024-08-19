import { useState, useEffect, SyntheticEvent } from "react";
import { TripPlace } from "../../types";
import {
  FormControl,
  Stack,
  Button,
  TextField,
  Autocomplete,
  Alert,
} from "@mui/material";
import { getPlaces } from "../../RESTFunctions";
import { v4 as uuidv4 } from "uuid";
import { mapStore } from "../../zustand/MapStore";
import { alertStore } from "../../zustand/AlertStore";

function ChangePlaceElement({
  handleIsEditingChange,
  oldPlace,
  handleOpenCloseModal,
}: {
  isEditing: boolean;
  handleIsEditingChange: () => void;
  oldPlace: TripPlace;
  handleOpenCloseModal: () => void;
}) {
  const [search, setSearch] = useState<string>("");
  const [newPlace, setNewPlace] = useState<TripPlace | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<TripPlace[]>([]);

  const setAlert = alertStore((state) => state.setAlert);

  const trip = mapStore((state) => state.trip);
  const activeDay = mapStore((state) => state.activeDay);
  const setTrip = mapStore((state) => state.setTrip);

  const city = trip?.tripDays[activeDay].city.name;

  // console.log(formData);

  useEffect(() => {
    (async () => {
      if (!search) return;

      setIsLoading(true);

      try {
        const places: TripPlace[] = await getPlaces(
          search,
          oldPlace.placeType.slice(0, 3)
        );

        // filter places to get only the places in the current city
        const cityPlaces = places.filter(
          (place) => place.cityName?.toLowerCase() === city?.toLowerCase()
        );

        setOptions(cityPlaces);
      } catch (error) {
        setError(`There is no place with the name ${search}`);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [city, search, oldPlace.placeType]);

  const handelAutoCompleteChange = (
    _event: SyntheticEvent<Element, Event>,
    value: TripPlace | null
  ) => {
    console.log("select value:", value);

    if (value) setNewPlace(value);
  };

  const handelPlaceChange = () => {
    if (trip && newPlace) {
      setTrip({
        ...trip,
        tripDays: trip.tripDays.map((day, i) =>
          i === activeDay
            ? {
                ...day,
                dayPlaces: day.dayPlaces.map((place: TripPlace) =>
                  place.id === oldPlace.id ? { ...place, ...newPlace } : place
                ),
                neededMony:
                  oldPlace.price && newPlace.price
                    ? day.neededMony -
                      oldPlace.price * trip.numberOfPeople +
                      newPlace.price * trip.numberOfPeople
                    : day.neededMony,
              }
            : day
        ),
        TotalCost:
          oldPlace.price && newPlace.price
            ? trip.TotalCost -
              oldPlace.price * trip.numberOfPeople +
              newPlace.price * trip.numberOfPeople
            : trip.TotalCost,
      });

      handleOpenCloseModal();

      setAlert({ text: "Place Changed Successfully", type: "success" });
    }

    // TODO: make the API call to change the place
  };

  return (
    <Stack gap={3} minHeight={270}>
      <h3>Change Place:</h3>

      {error ? (
        <Alert variant="filled" severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      ) : (
        <></>
      )}

      <FormControl sx={{ bgcolor: "#f0f0f0" }}>
        <Autocomplete
          id="new-place-name"
          options={options}
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          loading={isLoading}
          autoHighlight
          renderInput={(params) => (
            <TextField
              {...params}
              label="New Place Name"
              name="name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          )}
          renderOption={(props, option) => (
            <li {...props} key={uuidv4()}>
              {option.name}
            </li>
          )}
          getOptionLabel={(option) => `${option.name} - ${option.cityName}`}
          onChange={handelAutoCompleteChange}
        />
      </FormControl>
      <Stack direction="row" gap={2} justifyContent="end" marginTop="auto">
        <Button
          variant="contained"
          disabled={!newPlace}
          onClick={handelPlaceChange}
        >
          Done
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={handleIsEditingChange}
        >
          Cancel
        </Button>
      </Stack>
    </Stack>
  );
}

export default ChangePlaceElement;
