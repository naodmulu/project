import "./App.css";
import React from "react";

import Result from "./components/Result";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage";
import Registration from "./Components/Registration";
import { Loginpage } from "./Components/Loginpage";
function App() {
  return (
    <div >
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/result" element={<Result />} />
        <Route path="/" element={<Loginpage />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
    </div>
  );
}

export default App;
