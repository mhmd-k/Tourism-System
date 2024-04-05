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
    case "night place":
      icon = <Nightlife />;
      break;
    case "old place":
      icon = <AccountBalanceIcon />;
      break;
    case "natural place":
      icon = <ParkIcon />;
      break;
    case "shopping place":
      icon = <ShoppingCart />;
      break;
    case "airport":
      icon = <Flight />;
      break;
  }

  return icon;
}

export default PlaceIcon;
