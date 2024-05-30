import { Alert, Autocomplete, TextField } from "@mui/material";
import { SyntheticEvent, useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { tripInfoStore } from "../zustand/TripInfoStore";

interface CustomAsyncSelectProps {
  name: string;
  label: string;
  getOptions: (str: string) => Promise<unknown>;
}

function CustomAsyncSelect({
  name,
  label,
  getOptions,
}: CustomAsyncSelectProps) {
  const [fieldValue, setFieldValue] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const tripInfo = tripInfoStore((state) => state.tripInfo);
  const setTripInfo = tripInfoStore((state) => state.setTripInfo);

  useEffect(() => {
    if (!fieldValue) return;

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getOptions(`${fieldValue}`);
        if (data) {
          setOptions(data as string[]);
        }
      } catch (error) {
        setError(
          `an error occurred while fetching ${label} options, please try again later.`
        );
      } finally {
        setIsLoading(false);
      }
    }, 1000);

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [fieldValue, getOptions, label, name]);

  const handleChange = (
    _event: SyntheticEvent<Element, Event>,
    value: string | null
  ) => {
    if (value) {
      setTripInfo({ ...tripInfo, [name]: value });
    }
  };

  return (
    <>
      {error && (
        <Alert variant="filled" severity="error">
          {error}
        </Alert>
      )}
      <Autocomplete
        id={name}
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
            name={name}
            label={label}
            size="small"
            value={fieldValue}
            onChange={(e) => setFieldValue(e.target.value)}
            required
          />
        )}
        renderOption={(props, option) => (
          <li {...props} key={uuidv4()}>
            {option}
          </li>
        )}
        onChange={handleChange}
      />
    </>
  );
}

export default CustomAsyncSelect;
