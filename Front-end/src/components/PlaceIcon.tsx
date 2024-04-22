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
    case "resturant":
      icon = <Restaurant />;
      break;
    case "night":
      icon = <Nightlife />;
      break;
    case "old":
      icon = <AccountBalanceIcon />;
      break;
    case "natural":
      icon = <ParkIcon />;
      break;
    case "shop":
      icon = <ShoppingCart />;
      break;
    case "airport":
      icon = <Flight />;
      break;
  }

  return icon;
}

export default PlaceIcon;
