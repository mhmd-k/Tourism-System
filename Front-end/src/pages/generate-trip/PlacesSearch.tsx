import { Alert, TextField, Typography } from "@mui/material";
import { TripPlace } from "../../types";
import { SyntheticEvent, useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { Error } from "@mui/icons-material";

function sleep(duration: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

function PlacesSearch({
  setPlaces,
}: {
  setPlaces: React.Dispatch<React.SetStateAction<TripPlace[]>>;
}) {
  const [placeName, setPlaceName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<TripPlace[]>([]);

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

  const handleChange = (
    _event: SyntheticEvent<Element, Event>,
    value: TripPlace[] | null
  ) => {
    if (value) {
      setPlaces(value);
    }
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
        Add a specific places
      </Typography>

      {error ? (
        <Alert color="error" icon={<Error />}>
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
        isOptionEqualToValue={(option, value) => option.name === value.name}
        getOptionLabel={(option) =>
          `${option.name} - ${option.cityName} - ${option.placeType}`
        }
        options={options}
        loading={isLoading}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search"
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
        multiple
        onChange={handleChange}
      />
    </>
  );
}

export default PlacesSearch;
