import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./Reset.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import GenerateTrip from "./pages/GenerateTrip";
import UserProfile from "./pages/UserProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "userProfile", element: <UserProfile /> },
    ],
  },
  { path: "login", element: <Login /> },
  { path: "Signup", element: <Signup /> },
  { path: "generateTrip", element: <GenerateTrip /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
