import hotelResvations from "../data/hotelReservationsResponse.json";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/material";
import { HotelReservation } from "../types";

function HotelsReservationsPage() {
  return (
    <div className="reservations">
      <Container>
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f0f0f0" }}>
              <TableRow>
                <TableCell>hotel</TableCell>
                <TableCell align="center">address</TableCell>
                <TableCell align="center">date</TableCell>
                <TableCell align="center">number of people</TableCell>
                <TableCell align="center">price pear person</TableCell>
                <TableCell align="center">total amount</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {hotelResvations.map((place: HotelReservation) => (
                <TableRow>
                  <TableCell component="th" scope="row">
                    {place.hotelName ? place.hotelName : <></>}
                  </TableCell>
                  <TableCell align="center">{place.address}</TableCell>
                  <TableCell align="center">{place.date}</TableCell>
                  <TableCell align="center">
                    {place.toatlAmountOfMony / place.price}
                  </TableCell>
                  <TableCell align="center">{place.price}</TableCell>
                  <TableCell align="center">
                    {place.toatlAmountOfMony}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default HotelsReservationsPage;
