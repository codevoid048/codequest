import Home from "../pages/home";
import About from "../pages/about";
import Leaderboard from "../pages/leaderboard";
import Problemset from "../pages/problemset";
import Login from "../../src/components/public/login";
export const bodyRoutes = {
  Home: [
    { name: "home", path: "/", element: <Home /> },
  ],
  About: [
    { name: "about", path: "/about", element: <About /> },
  ],
  Problemset: [
    { name: "problemset", path: "/problemset", element: <Problemset /> },
  ],
  Leaderboard: [
    { name: "leaderboard", path: "/leaderboard", element: <Leaderboard /> },
  ],
  Login: [
    { name: "login", path: "/login", element: <Login /> },
  ],
};
