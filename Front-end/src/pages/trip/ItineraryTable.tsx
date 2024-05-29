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
import { formatMinutesToTime, formatTravelTime } from "../../utils";
import { TripPlace } from "../../types";

function ItineraryTable({ dayNumber }: { dayNumber: number }) {
  const trip = mapStore((state) => state.trip);

  const numberOfPeople = trip?.numberOfPeople;

  const day = trip?.tripDays[dayNumber - 1];

  if (!day || !numberOfPeople) return;

  let minutes = 60 * 9; // 9:00AM

  const places: TripPlace[] = [];

  day.dayPlaces.forEach((place, i) => {
    if (place.transportation_time && i !== 0) {
      minutes += place.transportation_time;
    }

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
              <TableCell align="center">Time</TableCell>
              <TableCell align="center">Place</TableCell>
              <TableCell align="center">Transportation</TableCell>
              <TableCell align="center">Transportation Cost</TableCell>
              <TableCell align="center">Ticket Price</TableCell>
              <TableCell align="center">Place Cost</TableCell>
              <TableCell align="center">Total Amount</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {places.map((place, i) => {
              let totalCost = 0;
              if (place.money_amount) totalCost += place.money_amount;
              if (place.transportaioncost) totalCost += place.transportaioncost;

              return (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    <Avatar
                      sx={{
                        bgcolor: "var(--green-color)",
                        width: 30,
                        height: 30,
                      }}
                      className="icon"
                    >
                      <PlaceIcon placeType={place.placeType} />
                    </Avatar>
                  </TableCell>
                  <TableCell align="center">
                    {i === places.length - 1
                      ? `${place.startHour}`
                      : `${place.startHour} - ${place.endHour}`}
                  </TableCell>
                  <TableCell align="center">
                    <Stack
                      direction={"row"}
                      gap={2}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      {place.name}
                    </Stack>
                  </TableCell>
                  <TableCell align="center">
                    {place.transportation_time &&
                      `${formatTravelTime(place.transportation_time)}`}{" "}
                    - {place.transportaionMethod}
                  </TableCell>
                  <TableCell align="center">
                    {place.transportaioncost
                      ? `${place.transportaioncost}$`
                      : "-"}
                  </TableCell>
                  <TableCell align="center">
                    {place.ticketprice
                      ? `${place.ticketprice}$`
                      : place.ticketprice_return
                        ? `${place.ticketprice_return}$`
                        : "-"}
                  </TableCell>
                  <TableCell align="center">
                    {place.price ? `${place.price}$` : "-"}
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    {totalCost}$
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ItineraryTable;
