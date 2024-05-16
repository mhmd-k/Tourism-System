import "./Reset.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import GenerateTrip from "./pages/generate-trip/GenerateTrip";
import UserProfile from "./pages/UserProfile";
import About from "./pages/About";
import TripsPage from "./pages/TripsPage";
import PlacesPage from "./pages/PlacesPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Trip from "./pages/trip/TripPage";
import HotelsReservationsPage from "./pages/HotelsReservationsPage";
import FlightsReservationsPage from "./pages/FlightsReservationsPage";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { element: <Home />, index: true },
      { path: "userProfile", element: <UserProfile /> },
      { path: "generateTrip", element: <GenerateTrip /> },
      { path: "about", element: <About /> },
      { path: "trips", element: <TripsPage /> },
      { path: "trips/:id", element: <Trip /> },
      { path: "places", element: <PlacesPage /> },
      { path: "hotelsReservations", element: <HotelsReservationsPage /> },
      { path: "flightsReservations", element: <FlightsReservationsPage /> },
    ],
  },
  { path: "login", element: <Login /> },
  { path: "Signup", element: <Signup /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
