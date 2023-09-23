import { useState } from "react";
import "../App.css";
import React from "react";
import UploadFile from "./UploadFile";
import DataInput from "./DataInput";
import MNavbar from "./MNavbar";
import { useNavigate } from "react-router-dom";

function HomePage() {
  

  const navgate = useNavigate();
  const gate = () => {
    navgate("/result");
  };

  return (
    <div>
      <MNavbar  />
      <div className="text-black body_Center">
          <UploadFile />
        
      </div>
    </div>
  );
}

export default HomePage;
