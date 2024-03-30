import GradeIcon from "@mui/icons-material/Grade";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { TripPlace } from "../types";
import { setImage } from "../utils";
import PlaceIcon from "./PlaceIcon";
import { memo } from "react";

const PlaceCard = memo(
  ({ name, address, price, stars, placeType, foodType }: TripPlace) => {
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
          <h3>{name}</h3>
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
          {price ? <p>Avg price: {price}$</p> : <></>}
          <address>{address}</address>
        </div>
      </div>
    );
  }
);

export default PlaceCard;
