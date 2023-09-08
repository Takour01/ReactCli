import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="main">
      <Suspense>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MainLayout;
