import { useMemo } from "react";
import { ModelPlace } from "../../types";
import ModelPlaceCard from "./ModelPlaceCard";
import Slider, { Settings } from "react-slick";

const settings: Settings = {
  infinite: true,
  speed: 500,
  draggable: true,
  slidesToShow: 6,
  slidesToScroll: 3,
  responsive: [
    {
      breakpoint: 1100,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 1,
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

function ModelPlacesContainer({ places }: { places: ModelPlace[] }) {
  const displayPlaces = useMemo(() => {
    const restaurants = places
      .filter((place) => place.placeType === "restaurant")
      .slice(0, 5);
    const oldPlaces = places
      .filter((place) => place.placeType === "old")
      .slice(0, 5);
    const nightPlaces = places
      .filter((place) => place.placeType === "night")
      .slice(0, 5);
    const shoppingPlaces = places
      .filter((place) => place.placeType === "shopping")
      .slice(0, 5);
    const hotels = places
      .filter((place) => place.placeType === "hotel")
      .slice(0, 5);
    const naturalPlaces = places
      .filter((place) => place.placeType === "natural")
      .slice(0, 5);

    return [
      ...restaurants,
      ...oldPlaces,
      ...nightPlaces,
      ...shoppingPlaces,
      ...hotels,
      ...naturalPlaces,
    ].sort(() => Math.random() - 0.5);
  }, [places]);

  return (
    <>
      <h3>Recommended to you by AI</h3>
      <Slider className="ai-places-container" {...settings}>
        {displayPlaces.map((place) => (
          <ModelPlaceCard key={place.id} {...place} />
        ))}
      </Slider>
    </>
  );
}

export default ModelPlacesContainer;
