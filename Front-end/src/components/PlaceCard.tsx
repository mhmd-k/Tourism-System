import GradeIcon from "@mui/icons-material/Grade";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Typography } from "@mui/material";
import { TripPlace } from "../types";
import { setImage } from "../utils";
import PlaceIcon from "./PlaceIcon";

function PlaceCard({
  name,
  address,
  price,
  stars,
  placeType,
  foodType,
}: TripPlace) {
  const starsArr = [];
  if (stars) {
    for (let i = 0; i < stars; i++) {
      starsArr.push(1);
    }
    for (let i = 0; i < 5 - stars; i++) {
      starsArr.push(0);
    }
  }

  const imageUrl = setImage(placeType, foodType);

  return (
    <div className="place-card">
      <div className="image">
        <img src={imageUrl} alt="" />
        <div className="place-type">
          <PlaceIcon placeType={placeType} /> {placeType} <br />
        </div>
      </div>
      <div className="content">
        <Typography component={"h3"} fontWeight={"600"}>
          {name}
        </Typography>
        {stars ? (
          <div className="stars">
            {starsArr.map((e, i) =>
              e === 1 ? (
                <GradeIcon fontSize="small" key={i} />
              ) : (
                <StarBorderIcon fontSize="small" key={i} />
              )
            )}
          </div>
        ) : (
          <></>
        )}
        <Typography component={"p"} fontSize={"small"} fontWeight={"500"}>
          Avg price: {price}$
        </Typography>
        <Typography component={"address"} fontSize={"small"}>
          {address}
        </Typography>
      </div>
    </div>
  );
}

export default PlaceCard;
