import { useEffect, useState } from "react";
import "../App.css";
import React from "react";
import MNavbar from "./MNavbar";
import { Discription } from "./Discription";
import { Grid, Menu, Slider } from "@mui/material";
import axios from 'axios';
import image from "../image/ana.png"

const ImageGen = () => {

  
  const [imageUrl, setImageUrl] = useState([]);
    
  
  const handleDownload = async () => {
    try {
      const response = await axios.get('http://localhost:5000/result', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}` 
        }
      });
      setImageUrl(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };
  
  //   return (
  //     <div>
  //       <h1>Download Images</h1>
  //       <button onClick={handleDownload}>Fetch Images</button>
  //       <div style={{ display: 'flex' }}>
  //         {imageUrl.map((image, index) => (
            
  //           <img
  //             key={index}
  //             src={`data:image/png;base64,${image}`}
  //             alt={`Image ${index}`}
  //             style={{ width: '150px', height: '150px', margin: '10px' }}
  //           />
  //         ))}
  //       </div>
  //     </div>
  //   );
  // };


  useEffect(() => {
    handleDownload();
  }, []);


  // length of image array turn to integer
  const length = parseInt(imageUrl.length);
  


  

  return (
    <div >
      <p className="text-black text-2xl mb-5 ml-5 font-bold">Discription of Keynote Frames</p>
      <p className="text-blue text-md mb-5 ml-5">frames: {length}</p>
      <Grid margin={"auto"}>
        <ul>
            <li>
              <Discription image={imageUrl} len={length} />
            </li>
          
        </ul>
    </Grid>

    </div>
  );
}

export default ImageGen;
