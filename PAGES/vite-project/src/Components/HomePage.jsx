import { useState } from "react";
import "../App.css";
import React from "react";


import UploadFile from "./UploadFile";
import MNavbar from "./MNavbar";
import { useNavigate } from "react-router-dom";

function HomePage() {
  let username = "User Name";
  let speciality = "Heart Specialist";

  const navgate = useNavigate();
  const gate = () => {
    navgate("/result");
  };

  const [authenticated, setAuthenticated] = useState(false);
  const authenticateUser = async () => {
    const response = await fetch('http://127.0.0.1:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'username', // Replace with actual username
        password: 'password', // Replace with actual password
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const accessToken = data.access_token;
      localStorage.setItem('accessToken', accessToken);
      setAuthenticated(true);
    } else {
      console.error('Error authenticating user');
    }
  };

  return (
    // if authenticated, render the upload file component
    // otherwise, render the login form
    <div>if (authenticated) {
      <div>
      <MNavbar username={username} speciality={speciality}  />
      <div className="text-black body_Center">
          <UploadFile />
        <div className="items-center">
          <button
            id="upload_data"
            onClick={gate}
            className="btn hover:bg-blue-200 focus:ring-blue-800"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
    } else {
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold">Login</h1>
          <div className="flex flex-col items-center justify-center">
            <input
              type="text"
              placeholder="Username"
              className="border-2 border-gray-400 rounded-lg p-2 m-2"
            />
            <input
              type="password"
              placeholder="Password"
              className="border-2 border-gray-400 rounded-lg p-2 m-2"
            />
            <button
              onClick={authenticateUser}
              className="border-2 border-gray-400 rounded-lg p-2 m-2"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    }
    
    </div>

  );
}

export default HomePage;
