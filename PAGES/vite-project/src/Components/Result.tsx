// import React, { useState, useEffect } from "react";
// import MNavbar from "./MNavbar";
// import GeneratedText from "./GeneratedText";
// import VideoPlayer from "./VideoPlayer";
// import ImageGen from "./ImageGen";

// function Result() {
//   const [videoUrls, setVideoUrls] = useState([]);
//   const [explain, setExplain] = useState("This is the generated outcome");
//   const [username, setUsername] = useState("UserName");

//   useEffect(() => {
//     const apiUrl = "http://127.0.0.1:5000/video/004_Introduction_to_this_section.mp4";
  
//     fetch(apiUrl)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setVideoUrls(data.videoUrls);
//       })
//       .catch((error) => {
//         console.error("Error fetching video URLs:", error);
//       });
//   }, []);
  

//   return (
//     <>
//       <MNavbar username={username} />
//       <div className="text-black body_Center">
//         <div className="flex">
//           <VideoPlayer videoUrls={videoUrls} />
//         </div>

//         <div className="items-center">
//           <ImageGen />
//         </div>
//       </div>
//     </>
//   );
// }

// export default Result;

import React, { useState, useEffect } from "react";
import MNavbar from "./MNavbar";
import GeneratedText from "./GeneratedText";
import VideoPlayer from "./VideoPlayer";
import ImageGen from "./ImageGen";

function Result() {

  const [videoUrl, setVideoUrl] = useState("");
  const [explain, setExplain] = useState("This is the generated outcome");
  const [username, setUsername] = useState("UserName");

  


  const videoUrls = [videoUrl];

  return (
    <>
      <MNavbar username={username} />
      <div className="text-black body_Center">
        <div className="flex">
          <VideoPlayer />
        </div>
        
        <div className="items-center">
         <ImageGen />
        </div>
      </div>
    </>
  );
}

export default Result;
