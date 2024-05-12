import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Calendar from "./pages/calendar/Calendar.jsx";
import Stats from "./pages/stats/Stats.jsx";
import Summary from "./pages/summary/Summary.jsx";
import Categories from "./pages/categories/Categories.jsx";
import App from "./App.jsx";
import "./index.css";
import Error from "./pages/error/Error.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/calendar",
        element: <Calendar />,
      },
      {
        path: "/stats",
        element: <Stats />,
      },
      {
        path: "/summary",
        element: <Summary />,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
