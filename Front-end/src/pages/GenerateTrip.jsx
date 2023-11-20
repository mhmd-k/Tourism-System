import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined";

const foodTypes = [
  "Sea Food",
  "Traditional",
  "Desserts",
  "Fast Food",
  "Fine Dinning",
];

function GenerateTrip() {
  return (
    <div className="generate-trip">
      <Stack direction={"row"} sx={{ height: "100%" }}>
        <Container sx={{ margin: "50px 0", flex: 1 }}>
          <Typography
            component={"h2"}
            fontSize={"24px"}
            align="center"
            marginBottom={"20px"}
            fontWeight={"bold"}
          >
            Fill This Form Please
          </Typography>
          <Stack direction={"column"} gap={2}>
            <FormControl>
              <InputLabel id="from" size="small">
                From City
              </InputLabel>
              <Select size="small" label="from" sx={{ textAlign: "left" }}>
                <MenuItem value=""></MenuItem>
                <MenuItem value="Damascus">Damascus</MenuItem>
                <MenuItem value="Aleppo">Aleppo</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel size="small" id="to-country">
                To Country
              </InputLabel>
              <Select
                size="small"
                label="to-country"
                sx={{ textAlign: "left" }}
              >
                <MenuItem value=""></MenuItem>
                <MenuItem value="Italy">Italy</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <TextField
                type="number"
                label="Number of Days"
                inputProps={{ max: "10", min: "1" }}
                size="small"
              />
            </FormControl>
            <FormControl>
              <TextField
                type="number"
                label="Number of People"
                inputProps={{ min: "1", max: "8" }}
                size="small"
              />
            </FormControl>
            <FormControl>
              <TextField
                type="number"
                label="Total Budget in Dollars"
                inputProps={{ min: "1" }}
                size="small"
              />
            </FormControl>
            <FormControl>
              <InputLabel size="small" id="to-country">
                Prefered Food
              </InputLabel>
              <Select
                multiple
                size="small"
                label="to-country"
                sx={{ textAlign: "left" }}
                value={[]}
              >
                {foodTypes.map((e, i) => (
                  <MenuItem key={`${e},${i}`} value={e}>
                    {e}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              sx={{ backgroundColor: "rgb(14, 186, 169)" }}
              endIcon={<AutoFixHighOutlinedIcon />}
            >
              Generate The Trip
            </Button>
          </Stack>
        </Container>
        <Container fixed className="image"></Container>
      </Stack>
    </div>
  );
}

export default GenerateTrip;
