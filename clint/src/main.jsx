import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GameMenu from "./GameMenu.jsx";
import App from "./App.jsx";
import FriendsOffline from "./FriendsOffline.jsx";
import Setting from "./Setting.jsx";
import "./index.css";
const router = createBrowserRouter([
  { path: "/", element: <GameMenu /> },
  { path: "/pwr", element: <App /> },
  { path: "/pwoffline", element: <FriendsOffline /> },
  { path: "/setting", element: <Setting /> },
]);
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  // <App />
  <RouterProvider router={router} />
  // </StrictMode>,
);
