import { Alert, Box, TextField } from "@mui/material";
import { ModelPlace, TripPlace } from "../../types";
import { SyntheticEvent, useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { Error } from "@mui/icons-material";
import { getPredictedPlacesRatings } from "../../RESTFunctions";
import { userStore } from "../../zustand/UserStore";
import ModelPlacesContainer from "./ModelPlacesContainer";
import Spinner from "../../components/Spinner";
import { selectedPlacesStore } from "../../zustand/SelectedPlacesStore";

function sleep(duration: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

function PlacesSearch() {
  const [placeName, setPlaceName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModelLoading, setIsModelLoading] = useState<boolean>(false);
  const [modelPlaces, setModelPlaces] = useState<ModelPlace[]>([]);

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<TripPlace[]>([]);

  const setPlaces = selectedPlacesStore((state) => state.setPlaces);

  const user = userStore((state) => state.user);

  useEffect(() => {
    (async () => {
      if (!placeName) return;

      setIsLoading(true);
      setError(null);

      try {
        await sleep(2000);

        const response = await axios.get(
          `http://localhost:8000/api/search?placeName=${placeName}`
        );

        if (response.status === 200) {
          setOptions(response.data.places);
        } else {
          setError(response.data.error);
        }
      } catch (error) {
        // @ts-expect-error error is undefined
        setError(error.response.data.error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [placeName]);

  useEffect(() => {
    (async () => {
      setPlaces("ModelPlaces", []);
      if (user) {
        setIsModelLoading(true);

        const data = await getPredictedPlacesRatings(user, {
          shopping: 0,
          night: 0,
          old: 0,
          restaurant: 0,
          hotel: 0,
          natural: 0,
        });

        if (data) {
          setModelPlaces(
            data.sort(
              (
                a: { predictedRating: number },
                b: { predictedRating: number }
              ) => b.predictedRating - a.predictedRating
            )
          );
        }

        setIsModelLoading(false);
      }
    })();
  }, []);

  const handleChange = (
    _event: SyntheticEvent<Element, Event>,
    value: TripPlace[]
  ) => {
    console.log("select value:", value);
    setPlaces("places", value);
  };

  return (
    <>
      <h2>Add some specific places</h2>

      {error ? (
        <Alert icon={<Error />} variant="filled" severity="error">
          {error}
        </Alert>
      ) : (
        <></>
      )}

      <Autocomplete
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
          <li {...props} key={`${option.id} - ${option.name}`}>
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

      {isModelLoading ? (
        <Box margin={"20px 0"}>
          <Spinner color="var(--blue-color)" size={40} />
        </Box>
      ) : (
        <ModelPlacesContainer places={modelPlaces} />
      )}
    </>
  );
}

export default PlacesSearch;
