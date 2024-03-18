import { Restaurant, Hotel, LocalDrink } from "@mui/icons-material";
import GradeIcon from "@mui/icons-material/Grade";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { TripPlace } from "../types";

function PlaceCard({
  name,
  address,
  price,
  stars,
  placeType,
  foodType,
}: TripPlace) {
  let icon = null;

  switch (placeType) {
    case "hotel":
      icon = <Hotel />;
      break;
    case "restaurant":
      icon = <Restaurant />;
      break;
    case "night place":
      icon = <LocalDrink />;
      break;
    case "old place":
      icon = <LocalDrink />;
      break;
    case "natural place":
      icon = <LocalDrink />;
      break;
    case "shopping":
      icon = <LocalDrink />;
      break;
  }

  const starsArr = [];
  for (let i = 0; i < stars; i++) {
    starsArr.push(1);
  }
  for (let i = 0; i < 5 - stars; i++) {
    starsArr.push(0);
  }

  let imageUrl = ``;

  switch (placeType) {
    case "hotel":
      imageUrl = `/src/assets/hotel-${Math.ceil(Math.random() * 4)}.jpg`;
      break;

    case "night place":
      imageUrl = `/src/assets/hotel-${Math.ceil(Math.random() * 4)}.jpg`;
      break;

    case "old place":
      imageUrl = `/src/assets/hotel-${Math.ceil(Math.random() * 4)}.jpg`;
      break;

    case "natural place":
      imageUrl = `/src/assets/hotel-${Math.ceil(Math.random() * 4)}.jpg`;
      break;

    case "shopping":
      imageUrl = `/src/assets/hotel-${Math.ceil(Math.random() * 4)}.jpg`;
      break;

    case "restaurant":
      if (foodType === "fine dinning")
        imageUrl = `/src/assets/fine-dinning.jpg`;
      break;
  }

  return (
    <Link to={""}>
      <div className="place-card">
        <div className="image">
          <img src={imageUrl} alt="" />
          <div className="place-type">
            {icon} {placeType} <br />
          </div>
        </div>
        <div className="content">
          <Typography component={"h3"} fontWeight={"600"}>
            {name}
          </Typography>
          <div className="stars">
            {starsArr.map((e, i) =>
              e === 1 ? (
                <GradeIcon fontSize="small" key={i} />
              ) : (
                <StarBorderIcon fontSize="small" key={i} />
              )
            )}
          </div>
          <Typography component={"p"} fontSize={"small"} fontWeight={"500"}>
            Avg price: {price}$
          </Typography>
          <Typography component={"address"} fontSize={"small"}>
            {address}
          </Typography>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCard;
