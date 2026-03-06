/* eslint-disable */

import React, { FC } from "react";
import '../assets/index.scss';
import { Route, Routes } from "react-router";
import { Home } from "@/pages";

const App: FC = () => {
  return (
    <Routes>
      <Route 
        path="/"
        element={<Home />} 
      />
    </Routes>
  );
};

export { App };