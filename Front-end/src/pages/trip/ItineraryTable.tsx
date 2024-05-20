import { Avatar, Box, Stack } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PlaceIcon from "../../components/PlaceIcon";
import { mapStore } from "../../zustand/MapStore";
import { formatMinutesToTime, formatPlaceType } from "../../utils";
import { TripPlace } from "../../types";

function ItineraryTable({ dayNumber }: { dayNumber: number }) {
  const trip = mapStore((state) => state.trip);

  const day = trip?.tripDays[dayNumber - 1];

  if (!day) return;

  let minutes = 60 * 9; // 9:00AM

  const places: TripPlace[] = [];

  day.dayPlaces.forEach((place) => {
    places.push({
      ...place,
      startHour: formatMinutesToTime(minutes),
      endHour: formatMinutesToTime(minutes + place.time * 60),
    });

    minutes += place.time * 60;
  });

  return (
    <>
      <Box display="flex" gap={3} justifyContent={"center"}>
        <p>Day {dayNumber}</p>
        <p>Date: {day.date}</p>
        <p>City: {day.city.name}</p>
        <p>Needed Money: {day.neededMony}$</p>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead
            sx={{
              backgroundColor: "var(--green-color)",
            }}
          >
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="center">time</TableCell>
              <TableCell align="center">place</TableCell>
              <TableCell align="center">money needed</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {places.map((place, i) => (
              <TableRow key={i}>
                <TableCell component="th" scope="row">
                  {i + 1}
                </TableCell>
                <TableCell align="center">
                  {place.startHour} - {place.endHour}
                </TableCell>
                <TableCell align="center">
                  <Stack
                    direction={"row"}
                    gap={2}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Avatar
                      sx={{
                        bgcolor: "var(--green-color)",
                        width: 24,
                        height: 24,
                      }}
                      className="icon"
                    >
                      <PlaceIcon placeType={place.placeType} />
                    </Avatar>
                    {place.name}
                  </Stack>
                </TableCell>
                <TableCell align="center">
                  {place.price ? `${place.price}$` : "0$"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ItineraryTable;
