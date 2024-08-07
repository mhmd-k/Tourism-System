import { Box } from "@mui/material";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useEffect, useState } from "react";
import { userStore } from "../../zustand/UserStore";
import { getPredictedPlacesRatings } from "../../RESTFunctions";
import { ModelPlace } from "../../types";
import Slider, { Settings } from "react-slick";
import ModelPlaceCard from "./ModelPlaceCard";

const settings: Settings = {
  arrows: false,
  infinite: true,
  speed: 500,
  draggable: true,
  slidesToShow: 6,
  slidesToScroll: 2,
  responsive: [
    {
      breakpoint: 1100,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
};

function ModelPlaces() {
  const [isModelLoading, setIsModelLoading] = useState<boolean>(false);
  const [modelPlaces, setModelPlaces] = useState<ModelPlace[]>([]);

  const user = userStore((state) => state.user);

  console.log("m:", modelPlaces);

  useEffect(() => {}, []);

  useEffect(() => {
    (async () => {
      const storedModelPlaces = localStorage.getItem("modelPlaces");
      if (storedModelPlaces) {
        setModelPlaces(JSON.parse(storedModelPlaces));
        return;
      }

      setModelPlaces([]);

      if (user) {
        setIsModelLoading(true);

        const data = await getPredictedPlacesRatings(user);

        if (data) {
          setModelPlaces((prevState) => [...prevState, ...data]);
          localStorage.setItem("modelPlaces", JSON.stringify(data));
        }
      }

      setIsModelLoading(false);
    })();
  }, [user]);

  return (
    <>
      {isModelLoading ? (
        <Box margin={"20px 0"}>
          <LoadingSpinner color="var(--blue-color)" size={40} />
        </Box>
      ) : (
        <>
          <h2>Recommended to you by AI</h2>
          <Slider {...settings}>
            {modelPlaces.map((place) => (
              <ModelPlaceCard key={place.id} {...place} />
            ))}
          </Slider>
        </>
      )}
    </>
  );
}

export default ModelPlaces;
