import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { mapStore } from "../zustand/MapStore";

function HotelsTable() {
  const trip = mapStore((state) => state.trip);

  const hotels = trip ? trip.hotelReservation : [];
  const numberOfPeople = trip ? trip.numberOfPeople : 0;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead sx={{ backgroundColor: "#f0f0f0" }}>
          <TableRow>
            <TableCell>hotel</TableCell>
            <TableCell align="center">address</TableCell>
            <TableCell align="center">number of people</TableCell>
            <TableCell align="center">price pear person</TableCell>
            <TableCell align="center">total amount</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {hotels.map((place, i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                {place.name ? place.name : <></>}
              </TableCell>
              <TableCell align="center">{place.address}</TableCell>
              <TableCell align="center">{numberOfPeople}</TableCell>
              <TableCell align="center">{place.price}$</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                {place.price * numberOfPeople}$
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default HotelsTable;
