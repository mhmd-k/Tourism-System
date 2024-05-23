import { Alert, Autocomplete, TextField } from "@mui/material";
import {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { sleep } from "../utils";
import { v4 as uuidv4 } from "uuid";

interface CustomAsyncSelectProps<T> {
  name: string;
  label: string;
  handleValueChange: Dispatch<SetStateAction<T>>;
  getOptions: (str: string) => Promise<unknown>;
}

function CustomAsyncSelect<T>({
  name,
  label,
  handleValueChange,
  getOptions,
}: CustomAsyncSelectProps<T>) {
  const [fieldValue, setFieldValue] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    (async () => {
      if (!fieldValue) return;

      setIsLoading(true);
      setError(null);

      try {
        await sleep(1000);

        const data = await getOptions(`${fieldValue}`);

        setOptions(data as string[]);
      } catch (error) {
        setError(
          `an error occured while fetching ${label} options, please try again later.`
        );
      } finally {
        setIsLoading(false);
      }
    })();
  }, [fieldValue, getOptions, label, name]);

  const handleChange = (
    _event: SyntheticEvent<Element, Event>,
    value: string | null
  ) => {
    if (value) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      handleValueChange((prevState: any) => ({ ...prevState, [name]: value }));
    }
  };

  return (
    <>
      {error ? (
        <Alert variant="filled" severity="error">
          {error}
        </Alert>
      ) : (
        <></>
      )}
      <Autocomplete
        id="city"
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
            name="city"
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