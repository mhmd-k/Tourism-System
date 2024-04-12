import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FlightReservation } from "../types";

function FlightsTable({ flights }: { flights: FlightReservation[] }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead sx={{ backgroundColor: "#f0f0f0" }}>
          <TableRow>
            <TableCell>airport</TableCell>
            <TableCell align="center">date</TableCell>
            <TableCell align="center">number of tickets</TableCell>
            <TableCell align="center">ticket price</TableCell>
            <TableCell align="center">total amount</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {flights.map((place) => (
            <TableRow>
              <TableCell component="th" scope="row">
                {place.airportName}
              </TableCell>
              <TableCell align="center">{place.date}</TableCell>
              <TableCell align="center">
                {place.toatlAmountOfMony / place.price}
              </TableCell>
              <TableCell align="center">{place.price}$</TableCell>
              <TableCell align="center">{place.toatlAmountOfMony}$</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default FlightsTable;
