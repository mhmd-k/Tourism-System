import {
  Restaurant,
  Hotel,
  Flight,
  Nightlife,
  ShoppingCart,
} from "@mui/icons-material";
import ParkIcon from "@mui/icons-material/Park";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

function PlaceIcon({ placeType }: { placeType: string }) {
  let icon = null;

  switch (placeType) {
    case "hotel":
      icon = <Hotel />;
      break;
    case "restaurant":
      icon = <Restaurant />;
      break;
    case "night_place":
      icon = <Nightlife />;
      break;
    case "old_place":
      icon = <AccountBalanceIcon />;
      break;
    case "natural_place":
      icon = <ParkIcon />;
      break;
    case "shopping_place":
      icon = <ShoppingCart />;
      break;
    case "airport":
      icon = <Flight />;
      break;
  }

  return icon;
}

export default PlaceIcon;
