import GradeIcon from "@mui/icons-material/Grade";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { TripPlace } from "../types";
import PlaceIcon from "./PlaceIcon";
import { memo } from "react";

const PlaceCard = memo(
  ({ name, address, price, stars, placeType }: TripPlace) => {
    const starsArr = [];
    if (stars) {
      for (let i = 0; i < stars; i++) {
        starsArr.push(1);
      }
      for (let i = 0; i < 5 - stars; i++) {
        starsArr.push(0);
      }
    }

    return (
      <div className="place-card">
        <div className="image">
          <img
            src={`https://source.unsplash.com/1600x900/?${placeType.toLowerCase() === "resturant" ? "restaurant" : name}`}
            loading="lazy"
            alt=""
          />
          <div className="place-type">
            <PlaceIcon placeType={placeType} /> {placeType.split("_").join(" ")}{" "}
            <br />
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
