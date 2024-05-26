import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Schedule from "./pages/calendar/Schedule.jsx";
import Stats from "./pages/stats/Stats.jsx";
import Summary from "./pages/summary/Summary.jsx";
import Categories from "./pages/categories/Categories.jsx";
import App from "./App.jsx";
import "./index.css";
import Error from "./pages/error/Error.jsx";
import { AuthProvider } from "./components/auth/AuthProvider.jsx";
import SignIn from "./pages/signIn/SignIn.jsx";
import ProtectedRoute from "./components/route/ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/calendar",
        element: (
          <ProtectedRoute>
            <Schedule />
          </ProtectedRoute>
        ),
      },
      {
        path: "/stats",
        element: (
          <ProtectedRoute>
            <Stats />
          </ProtectedRoute>
        ),
      },
      {
        path: "/summary",
        element: (
          <ProtectedRoute>
            <Summary />
          </ProtectedRoute>
        ),
      },
      {
        path: "/categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
