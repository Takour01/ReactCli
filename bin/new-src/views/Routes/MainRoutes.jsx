import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import ErrorPage from "../../ErrorPage";
const MainRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />} errorElement={<ErrorPage />}>
        <Route index element={<h1>Hello world</h1>} />
      </Route>
    </Routes>
  );
};

export default MainRoutes
