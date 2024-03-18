import "./Reset.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import GenerateTrip from "./pages/trips/GenerateTrip";
import UserProfile from "./pages/UserProfile";
import MapElement from "./pages/trips/MapElement";
import About from "./pages/About";
import TripsPage from "./pages/TripsPage";
import PlacesPage from "./pages/PlacesPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

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
      {
        path: "places",
        element: <PlacesPage />,
      },
    ],
  },
  { path: "login", element: <Login /> },
  { path: "Signup", element: <Signup /> },
  { path: "map", element: <MapElement /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
