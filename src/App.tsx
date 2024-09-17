import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import ErrorPage from "./ErrorPage";
import Login from "./pages/auth/Login";
import VerScript from "./pages/script/VerScript";



const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/view',
    element: <VerScript />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);



const App = () => (

  <RouterProvider router={router} />

);


export default App;
