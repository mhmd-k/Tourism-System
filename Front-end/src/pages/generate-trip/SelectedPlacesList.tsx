import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { selectedPlacesStore } from "../../zustand/SelectedPlacesStore";

function SelectedPlacesList() {
  const places = selectedPlacesStore((state) => state.places);
  const modelplaces = selectedPlacesStore((state) => state.modelPlaces);

  const allPlaces = [...places, ...modelplaces];

  return (
    <>
      {allPlaces.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f0f0f0" }}>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="center">place</TableCell>
                <TableCell align="center">place type</TableCell>
                <TableCell align="center">city</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {allPlaces.map((place, i) => (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    {i + 1}
                  </TableCell>
                  <TableCell align="center">{place.name}</TableCell>
                  <TableCell align="center">{place.placeType}</TableCell>
                  <TableCell align="center">{place.cityName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

export default SelectedPlacesList;
