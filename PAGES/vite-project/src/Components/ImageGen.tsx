import { useState } from "react";
import "../App.css";
import React from "react";
import MNavbar from "./MNavbar";
import { Discription } from "./Discription";
import { Grid, Menu } from "@mui/material";

function ImageGen() {
  const username = "User";
  const image = ["Image1", "Image2", "Image3"]
  

  return (
    <div>
      <MNavbar username={username} />
      <p className="text-black text-2xl mb-5 ml-5 font-bold">GeneralizeTitle</p>
      <Grid margin={"auto"}>
        <ul>
            {/* map every image to discription */}
          {image.map((image) => (
            <li>
              <Discription image={image} />
            </li>
          ))}
        </ul>
    </Grid>

    </div>
  );
}

export default ImageGen;
