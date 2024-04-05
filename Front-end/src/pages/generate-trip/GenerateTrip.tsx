import { GenerateTripData, TripPlace } from "../../types";
import { validateTripInfo } from "../../utils";
import Survey from "./Survey";
import Spinner from "../../components/Spinner";
import { useState } from "react";
import {
  Button,
  ButtonGroup,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined";
import ArrowBackOutlined from "@mui/icons-material/ArrowBackOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import PlacesSearch from "./PlacesSearch";
import { userStore } from "../../zustand/UserStore";
import { Navigate } from "react-router-dom";

function GenerateTrip() {
  const [formData, setFormData] = useState<GenerateTripData>({
    toCountry: "",
    fromCity: "",
    date: "",
    numberOfDays: 0,
    numberOfPeople: 0,
    careAboutBudget: true,
    budget: 0,
    preferredFood: [],
    preferredPlaces: [],
  });
  const [places, setPlaces] = useState<TripPlace[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);

  const user = userStore((state) => state.user);

  console.log("genearateTrip:", formData);
  console.log("places: ", places);

  const handleSubmit = () => {
    setIsLoading(true);
    const err = validateTripInfo(formData);

    if (err) {
      setError(err);
      setIsLoading(false);
      return;
    }

    // TODO: Make API call

    setIsLoading(false);
  };

  if (!user?.token) {
    return Navigate({
      to: "../login",
      replace: true,
      state: "You must be loged in first",
    });
  }

  return (
    <div className="generate-trip">
      <Stack direction={"row"} sx={{ height: "100%" }}>
        <Container className="generate-trip-container">
          {error ? (
            <Typography
              className="bold"
              component={"p"}
              fontSize={15}
              textAlign={"center"}
              color={"red"}
              style={{
                border: "2px solid red",
                padding: 10,
                borderRadius: 2,
              }}
            >
              {error}
            </Typography>
          ) : (
            <></>
          )}

          <div className="form-body">
            {page === 0 && (
              <Survey setFormData={setFormData} formData={formData} />
            )}
            {page === 1 && <PlacesSearch setPlaces={setPlaces} />}
          </div>

          <ButtonGroup sx={{ p: 3, gap: 2, justifyContent: "center" }}>
            <IconButton onClick={() => setPage(page - 1)} disabled={page === 0}>
              <ArrowBackOutlined />
            </IconButton>
            <IconButton onClick={() => setPage(page + 1)} disabled={page === 1}>
              <ArrowForwardOutlinedIcon />
            </IconButton>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "var(--green-color)",
                borderRadius: "5px !important",
              }}
              endIcon={isLoading ? <></> : <AutoFixHighOutlinedIcon />}
              disabled={isLoading || page === 0}
              onClick={handleSubmit}
            >
              {isLoading ? <Spinner /> : "Generate Trip"}
            </Button>
          </ButtonGroup>
        </Container>
        <Container fixed className="image"></Container>
      </Stack>
    </div>
  );
}

export default GenerateTrip;
