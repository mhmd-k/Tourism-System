import { useState, useEffect, SyntheticEvent } from "react";
import { TripPlace } from "../../types";
import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Stack,
  Button,
  TextField,
  SelectChangeEvent,
  Autocomplete,
  Alert,
} from "@mui/material";
import { getPlaces } from "../../RESTFunctions";
import { v4 as uuidv4 } from "uuid";
import { mapStore } from "../../zustand/MapStore";

interface formData {
  name: string;
  type: string;
  newPlace: TripPlace | null;
}

const placeTypeOptions = [
  { label: "Old Place", value: "old_place" },
  { label: "Natural place", value: "natural_place" },
  { label: "Night Place", value: "night_place" },
  { label: "Shopping Place", value: "shopping_place" },
  { label: "Restaurant", value: "restaurant" },
];

function ChangePlaceElement({
  handleIsEditingChange,
  oldPlace,
}: {
  isEditing: boolean;
  handleIsEditingChange: () => void;
  oldPlace: TripPlace;
}) {
  const [formData, setFormData] = useState<formData>({
    name: "",
    type: "",
    newPlace: null,
  });

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<TripPlace[]>([]);

  const trip = mapStore((state) => state.trip);
  const activeDay = mapStore((state) => state.activeDay);

  const city = trip?.tripDays[activeDay].city.name;

  // console.log(formData);

  useEffect(() => {
    (async () => {
      if (!formData.name) return;

      setIsLoading(true);

      try {
        const places: TripPlace[] = await getPlaces(
          formData.name,
          formData.type
        );

        // filter places to get only the places in the current city
        const cityPlaces = places.filter(
          (place) => place.cityName?.toLowerCase() === city?.toLowerCase()
        );

        setOptions(cityPlaces);
      } catch (error) {
        setError(`There is no place with the name ${formData.name}`);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [city, formData.name, formData.type]);

  const handelChange = (e: SelectChangeEvent<string>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handelAutoCompleteChange = (
    _event: SyntheticEvent<Element, Event>,
    value: TripPlace | null
  ) => {
    console.log("select value:", value);

    setFormData((prevState) => ({ ...prevState, newPlace: value }));
  };

  const handel = async () => {
    // TODO: make the API call to change the place
  };

  return (
    <Stack gap={3} minHeight={270}>
      <h3>Change Place:</h3>
      <FormControl sx={{ bgcolor: "#f0f0f0" }}>
        <InputLabel size="small" id="new-palce-type">
          New Place Type
        </InputLabel>
        <Select
          name="type"
          type="text"
          label="new-palce-type"
          size="small"
          value={formData.type}
          onChange={handelChange}
        >
          {placeTypeOptions.map((e, i) => (
            <MenuItem key={i} value={e.value}>
              {e.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {error ? (
        <Alert variant="filled" severity="error">
          {error}
        </Alert>
      ) : (
        <></>
      )}

      {formData.type && (
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
                value={formData.name}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    name: e.target.value,
                  }))
                }
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
      )}
      <Stack direction="row" gap={2} justifyContent="end" marginTop="auto">
        <Button
          variant="contained"
          disabled={!formData.newPlace || !formData.type}
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
