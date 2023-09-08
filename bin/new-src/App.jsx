import React from "react";
import "./App.scss";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "swiper/css/bundle";
import MainRoutes from "./views/Routes/MainRoutes";
const router = createBrowserRouter(
  createRoutesFromElements(<Route path="*" element={<MainRoutes />} />)
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
