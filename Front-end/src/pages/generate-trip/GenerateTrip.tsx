import { validateTripInfo } from "../../utils";
import Survey from "./Survey";
import Spinner from "../../components/LoadingSpinner";
import { useEffect, useState } from "react";
import { Alert, Button, Container } from "@mui/material";
import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined";
import PlacesSearch from "./PlacesSearch";
import { userStore } from "../../zustand/UserStore";
import { Navigate, useNavigate } from "react-router-dom";
import { generateTrip } from "../../RESTFunctions";
import { Error } from "@mui/icons-material";
import { mapStore } from "../../zustand/MapStore";
import { tripInfoStore } from "../../zustand/TripInfoStore";

function GenerateTrip() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const formData = tripInfoStore((state) => state.tripInfo);

  const places = tripInfoStore((state) => state.places);
  const modelplaces = tripInfoStore((state) => state.modelPlaces);
  const setPlaces = tripInfoStore((state) => state.setPlaces);
  const setModelPlaces = tripInfoStore((state) => state.setModelPlaces);

  const user = userStore((state) => state.user);

  const setTrip = mapStore((state) => state.setTrip);
  const setActiveDay = mapStore((state) => state.setActiveDay);

  console.log("genearateTrip:", formData);
  console.log("places: ", places);
  console.log("Modelplaces: ", modelplaces);

  useEffect(() => {
    setModelPlaces([]);
    setPlaces([]);
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
        <form>
          <div className="form-body">
            <Survey />

            <PlacesSearch />

            {error ? (
              <Alert
                variant="filled"
                severity="error"
                sx={{ marginTop: 2, position: "sticky", top: "0" }}
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

            <Button
              variant="contained"
              className="generate-trip-btn"
              endIcon={isLoading ? <></> : <AutoFixHighOutlinedIcon />}
              disabled={isLoading}
              onClick={handleSubmit}
            >
              {isLoading ? <Spinner /> : "Generate Trip"}
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
}

export default GenerateTrip;
