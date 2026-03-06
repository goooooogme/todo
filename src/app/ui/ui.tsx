/* eslint-disable */

import React from "react";
import '../assets/index.scss';
import { Route, Routes } from "react-router";
import { Home } from "@/pages";

const App = () => {
  return (
    <>
      <Routes>
        <Route 
          path="/"
          element={<Home />} 
        />
      </Routes>
    </>
  )
};

export { App };