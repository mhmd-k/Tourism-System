import { GenerateTripData, TripPlace } from "../../types";
import { validateTripInfo } from "../../utils";
import Survey from "./Survey";
import Spinner from "../../components/Spinner";
import { useState } from "react";
import {
  Alert,
  Button,
  ButtonGroup,
  Container,
  IconButton,
  Stack,
} from "@mui/material";
import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined";
import ArrowBackOutlined from "@mui/icons-material/ArrowBackOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import PlacesSearch from "./PlacesSearch";
import { userStore } from "../../zustand/UserStore";
import { Navigate, useNavigate } from "react-router-dom";
import { generateTrip } from "../../RESTFunctions";
import { Error } from "@mui/icons-material";

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

  const navigate = useNavigate();

  const user = userStore((state) => state.user);

  // console.log("genearateTrip:", formData);
  console.log("places: ", places);
  // console.log("trip: ", trip);

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

    try {
      const trip = await generateTrip(user?.id, formData, places);

      console.log("trip generate: ", trip);

      navigate("../trips/1", {
        state: {
          trip: trip,
          places: places,
          careAboutBudget: formData.careAboutBudget,
        },
      });
    } catch (error) {
      console.error(error);
      setError("something went worng please try again later");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="generate-trip">
      <Stack direction={"row"} sx={{ height: "100%" }}>
        <Container className="generate-trip-container">
          {error ? (
            <Alert color="error" icon={<Error />}>
              {error}
            </Alert>
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
