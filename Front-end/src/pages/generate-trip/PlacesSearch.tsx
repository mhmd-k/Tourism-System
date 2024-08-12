import { Alert, TextField } from "@mui/material";
import { TripPlace } from "../../types";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import ModelPlaces from "./ModelPlaces";
import SelectedPlacesList from "./SelectedPlacesList";
import { sleep } from "../../utils";
import { v4 as uuidv4 } from "uuid";
import { getPlaces } from "../../RESTFunctions";
import { tripInfoStore } from "../../zustand/TripInfoStore";

function PlacesSearch() {
  const [placeName, setPlaceName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<TripPlace[]>([]);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const places = tripInfoStore((state) => state.places);
  const setPlaces = tripInfoStore((state) => state.setPlaces);

  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(async () => {
      if (!placeName) return;

      setIsLoading(true);
      setError(null);

      try {
        await sleep(2000);

        const places = await getPlaces(placeName);
        console.log(places);
        if (places) {
          setOptions(places);
        }
      } catch (error) {
        setError("Error getting places");
      } finally {
        setIsLoading(false);
      }
    }, 1000);

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [placeName]);

  const handleChange = (
    _event: SyntheticEvent<Element, Event>,
    value: TripPlace[]
  ) => {
    // console.log("selected value:", value);

    setPlaces(value);
  };

  return (
    <>
      <h2>Add some specific places</h2>

      {error ? (
        <Alert variant="filled" severity="error">
          {error}
        </Alert>
      ) : (
        <></>
      )}

      <Autocomplete
        value={places}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search"
            name="places-search"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isLoading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
            value={placeName}
            onChange={(e) => setPlaceName(e.target.value)}
          />
        )}
        groupBy={(option) =>
          `${option.placeType.split("_").join(" ").toUpperCase()}S`
        }
        renderOption={(props, option) => (
          <li {...props} key={uuidv4()}>
            {option.name},{" "}
            <u>
              <i>{option.cityName}</i>
            </u>
          </li>
        )}
        isOptionEqualToValue={(option, value) => option.name === value.name}
        getOptionLabel={(option) => `${option.name} - ${option.cityName}`}
        options={options}
        loading={isLoading}
        onChange={handleChange}
        autoHighlight
        multiple
      />

      <ModelPlaces />

      <SelectedPlacesList />
    </>
  );
}

export default PlacesSearch;
