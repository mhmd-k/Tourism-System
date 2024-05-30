import { GenerateTripData } from "../../types";
import { validateTripInfo } from "../../utils";
import Survey from "./Survey";
import Spinner from "../../components/LoadingSpinner";
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  ButtonGroup,
  Container,
  IconButton,
} from "@mui/material";
import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined";
import ArrowBackOutlined from "@mui/icons-material/ArrowBackOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import PlacesSearch from "./PlacesSearch";
import { userStore } from "../../zustand/UserStore";
import { Navigate, useNavigate } from "react-router-dom";
import { generateTrip } from "../../RESTFunctions";
import { Error } from "@mui/icons-material";
import { mapStore } from "../../zustand/MapStore";
import { selectedPlacesStore } from "../../zustand/SelectedPlacesStore";

function GenerateTrip() {
  const [formData, setFormData] = useState<GenerateTripData>({
    toCountry: "",
    fromCity: "",
    date: "",
    numberOfDays: "",
    numberOfPeople: "",
    cheapestTrip: true,
    careAboutBudget: false,
    budget: 0,
    preferredFood: [],
    preferredPlaces: [],
    userCompanions: null,
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);

  const navigate = useNavigate();

  const places = selectedPlacesStore((state) => state.places);
  const modelplaces = selectedPlacesStore((state) => state.modelPlaces);
  const setPlaces = selectedPlacesStore((state) => state.setPlaces);

  const user = userStore((state) => state.user);

  const setTrip = mapStore((state) => state.setTrip);
  const setActiveDay = mapStore((state) => state.setActiveDay);

  console.log("genearateTrip:", formData);
  console.log("places: ", places);
  console.log("Modelplaces: ", modelplaces);

  useEffect(() => {
    setPlaces("ModelPlaces", []);
    setPlaces("places", []);
  }, []);

  // if the user is not signed in
  if (!user?.token) {
    return Navigate({
      to: "../login",
      replace: true,
      state: "You must be loged in first",
    });
  }

  const handleSubmit = async () => {
    setError(null);
    setIsLoading(true);
    const err = validateTripInfo(formData);

    if (err) {
      setError(err);
      setIsLoading(false);
      return;
    }

    const trip = await generateTrip(user?.id, formData, [
      ...places,
      ...modelplaces,
    ]);

    console.log("trip generated: ", trip);

    if (trip) {
      setTrip(trip);
      setActiveDay(0);
      localStorage.setItem("trip", JSON.stringify(trip));
      navigate("../trips/1", {
        state: { places: [...places, ...modelplaces] },
      });
    } else {
      setError("something went worng please try again later");
    }

    setIsLoading(false);
  };

  return (
    <div className="generate-trip">
      <Container className="generate-trip-container">
        <div className="form-body">
          {page === 0 && (
            <Survey setFormData={setFormData} formData={formData} />
          )}
          {page === 1 && <PlacesSearch />}
        </div>

        {error ? (
          <Alert
            variant="filled"
            severity="error"
            sx={{ marginTop: 2 }}
            icon={<Error />}
            onClose={() => {
              setError(null);
            }}
          >
            {error}
          </Alert>
        ) : (
          <></>
        )}

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
            disabled={isLoading}
            onClick={handleSubmit}
          >
            {isLoading ? <Spinner /> : "Generate Trip"}
          </Button>
        </ButtonGroup>
      </Container>
    </div>
  );
}

export default GenerateTrip;
