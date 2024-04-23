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

  switch (placeType.slice(0, 3)) {
    case "hot":
      icon = <Hotel />;
      break;
    case "res":
      icon = <Restaurant />;
      break;
    case "nig":
      icon = <Nightlife />;
      break;
    case "old":
      icon = <AccountBalanceIcon />;
      break;
    case "nat":
      icon = <ParkIcon />;
      break;
    case "sho":
      icon = <ShoppingCart />;
      break;
    case "air":
      icon = <Flight />;
      break;
  }

  return icon;
}

export default PlaceIcon;
