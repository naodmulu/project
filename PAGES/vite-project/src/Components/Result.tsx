import React, { useState, useEffect } from "react";
import MNavbar from "./MNavbar";
import GeneratedText from "./GeneratedText";
import VideoPlayer from "./VideoPlayer";
<<<<<<< HEAD
import React from "react";
import ImageGen from "./ImageGen";
=======
import ImageGen from "./ImageGen";

>>>>>>> effbf0a97987006817d380b5cafd8b759893d4f8
function Result() {
  const [videoUrls, setVideoUrls] = useState([]);
  const [explain, setExplain] = useState("This is the generated outcome");
  const [username, setUsername] = useState("UserName");

  useEffect(() => {
    // Define the URL of your backend endpoint
    const apiUrl = "http://127.0.0.1:5000/V";

    // Fetch video URLs from the backend
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the data from the backend is in the format { videoUrls: [...] }
        setVideoUrls(data.videoUrls);
      })
      .catch((error) => {
        console.error("Error fetching video URLs:", error);
      });
  }, []);

  return (
    <>
      <MNavbar username={username} />
      <div className="text-black body_Center">
        <div className="flex">
          <VideoPlayer videoUrls={videoUrls} />
        </div>
<<<<<<< HEAD
        
        <div className="items-center">
         <ImageGen />
=======

        <div className="items-center">
          <ImageGen />
>>>>>>> effbf0a97987006817d380b5cafd8b759893d4f8
        </div>
      </div>
    </>
  );
}

export default Result;
