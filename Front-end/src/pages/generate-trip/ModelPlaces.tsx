import { Box } from "@mui/material";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useEffect, useState } from "react";
import { userStore } from "../../zustand/UserStore";
import { getPredictedPlacesRatings } from "../../RESTFunctions";
import ModelPlacesContainer from "./ModelPlacesContainer";
import { ModelPlace } from "../../types";

function ModelPlaces() {
  const [isModelLoading, setIsModelLoading] = useState<boolean>(false);
  const [modelPlaces, setModelPlaces] = useState<ModelPlace[]>([]);

  const user = userStore((state) => state.user);

  useEffect(() => {
    (async () => {
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

  return (
    <>
      {isModelLoading ? (
        <Box margin={"20px 0"}>
          <LoadingSpinner color="var(--blue-color)" size={40} />
        </Box>
      ) : (
        <ModelPlacesContainer places={modelPlaces} />
      )}
    </>
  );
}

export default ModelPlaces;
