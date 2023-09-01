import "./App.css";
import React from "react";

import Result from "./components/Result";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage";
import ImageGen from "./Components/ImageGen";
import Registration from "./Components/Registration";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/result" element={<Result />} />
        <Route path="/imageGen" element={<ImageGen />} />
        <Route path="/" element={<Registration />} />
      </Routes>
    </div>
  );
}

export default App;
