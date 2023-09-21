<<<<<<< HEAD
import React, {useState} from "react";
import './Loginpage.css';
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const Loginpage = (props) => {
=======
import React, { useState } from "react";
import './Loginpage.css';
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { HiOutlineMail, HiUser, HiPhone, HiLockClosed } from "react-icons/hi";


export const Loginpage = () => {


>>>>>>> effbf0a97987006817d380b5cafd8b759893d4f8
  const navgate = useNavigate();
  const gate = () => {
    navgate("/register");
  };
<<<<<<< HEAD
  const navgate2 = useNavigate();
  const gate2 = () => {
    navgate("/home");
  };
=======
  const gate2 = () => {
    navgate("/home");
  };
  
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const loginData = JSON.stringify(formData);
    console.log(loginData);

    fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: loginData,
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      console.log("Login successful", data);
      gate2();
      // Redirect or perform other actions on successful login
    })
    .catch((error) => {
      console.error("Error:", error);
      // Handle error (e.g., display error message)
    });
  };

  
>>>>>>> effbf0a97987006817d380b5cafd8b759893d4f8
    return(
        <div className="App">
            <div className="auth-form-container">
               <section className="form-container" >
            <form action="/my-handling-form-page"
            method="post" className="Loginpage-form"
            >
            
                <h2 className="text-black font-bold text-2xl flex justify-start ml-3">Login Here</h2>
                <h4 className="text-black text-md  flex justify-start ml-3">Welcome</h4>
                <br></br>
<<<<<<< HEAD
                <div className="relative ">
  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5  pointer-events-none">
    <svg className="w-4 h-4 ml-3 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
      <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
      <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
    </svg>
  </div>
  <input type="email" id="email-address-icon" className="bg-gray-200 border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  " placeholder="E-mail Address/UserName"/>
</div>
                <br></br>
                <div className="relative">
  <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
    <FaLock className="ml-3 text-gray-400"/>
  </div>
  <input type="password" id="email-address-icon" className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  " placeholder="Password"/>
</div>
                <br></br>
                <button type="submit"
                onClick={gate2}
                className="link-btn3"
                ><b>Login</b></button>
=======
                <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Username
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
              <HiUser className="icon" />
            </div>
            <input
              type="text"
              id="username"
              placeholder="Username / Email"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-full mb-1  focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

                
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
              <HiLockClosed className="icon" />
            </div>
            <input
              type="password"
              id="new-password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-full mb-1  focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
                
                <button type="submit"
                style={{
                  borderRadius: 40,
                  width: "50%",
                  background: "#0bacc5",
                  borderBlockColor: "white",
                  marginTop: "10px",
                }}
                onClick={handleSubmit}
                className="link-btn3"
                ><b>Login</b></button>
                
                
>>>>>>> effbf0a97987006817d380b5cafd8b759893d4f8
                <br></br>
            <button onClick={gate} className="link-btn" ><b>singup</b></button>
            <button className="link-btn2"><b>forget password?</b></button>
            </form>
            </section>
            </div>
        </div>
        
    )
}