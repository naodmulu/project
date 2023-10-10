import { useState } from "react";
import "../App.css";
import React from "react";
import MNavbar from "./MNavbar";
import { Discription } from "./Discription";
import { Grid, Menu, Slider } from "@mui/material";

function ImageGen() {
 
  const image = ["Image1", "Image2", "Image3", "Image4", "Image5"]

  // length of image array turn to integer
  const length = parseInt(image.length);
  const [slide , setSlide] = useState(1);

  

  return (
    <div >
      <p className="text-black text-2xl mb-5 ml-5 font-bold">Discription of Keynote Frames</p>
      <p className="text-blue text-md mb-5 ml-5">frames: {length}</p>
      <Grid margin={"auto"}>
        <ul>
            <li>
              <Discription image={image[slide-1]} />
              <Slider
                  aria-label="Temperature"
                  defaultValue={1}
                  valueLabelDisplay="auto"
                  step={1}
                  marks
                  min={1}
                  max={length}
                  onChange={(e) => setSlide(e.target.value)}
                />
            </li>
          
        </ul>
    </Grid>

    </div>
  );
}

export default ImageGen;
