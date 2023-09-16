import "./registration.css";
import { Button } from "flowbite-react";
import { HiOutlineMail, HiUser, HiPhone, HiLockClosed } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useState } from "react";

export default function MyPage() {
  const navgate = useNavigate();

  const gate = () => {
    navgate("/");
  };
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreedToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    const registerData = JSON.stringify(formData);
    console.log(registerData);

    fetch("http://127.0.0.1:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: registerData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Registration successful!", data);
        navgate("/");
      })
      .catch((error) => {
        console.error("Error re:", error);
      });
  };
  
  return (
    <div className="flex">
      <div
        className="main"
        style={{
          background: "#1363DF",
          width: "65%",
          height: "120vh",
          marginRight: 100,
        }}
      >
      </div>
      <div className="form">
        <h1>Hello!</h1>
        <h2>Sign Up to Get Started</h2>

        <form onSubmit={handleSubmit} className="">
          <label
            
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            First Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5  pointer-events-none">
              <HiUser className = "icon" />
            </div>
            <input
              type="text"
              id="first-name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}       
              className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-full mb-1  focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="First Name"
            />
          </div>
          <label
            
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Last Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
              <HiUser className="icon" />
            </div>
            <input
              type="text"
              id="last-name"
              placeholder="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-full mb-1  focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
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
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-full mb-1  focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <label
            htmlFor="email-address-icon"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
              <HiOutlineMail className="icon" />
            </div>
            <input
              type="email"
              id="email-address"
              placeholder="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-full mb-1  focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Phone Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
              <HiPhone className="icon" />
            </div>
            <input
              type="phone"
              id="phone"
              placeholder="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-full mb-1  focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            New Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
              <HiLockClosed className="icon" />
            </div>
            <input
              type="password"
              id="new-password"
              placeholder="New Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-full mb-1  focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
              <HiLockClosed className="icon" />
            </div>
            <input
                type="password"
                id="confirm-password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-full mb-1  focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="flex items-center mb-4">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded full mb-1 cus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="default-checkbox"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-600"
            >
              I agree to the terms and conditions that apply!
            </label>
          </div>
          <div className="button ">
        <button
            style={{
              borderRadius: 40,
              width: "95%",
              background: "#0bacc5",
              borderBlockColor: "white",
            }}
            type="submit"
            className="py-2.5 px-5 mr-2 mb-2 text-lg font-large font-semibold font-Arial text-white-900 focus:outline-white bg-white rounded-lg border border-gray-100 hover:bg-blue-100 hover:text-white-700 focus:z-10 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-100 dark:bg-blue-100 dark:text-blue-100 dark:border-blue-100 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Register
          </button>
        </div>
          
        </form>
        
        <p className="text-sm font-light p-4">
                      Already have an account? <span onClick={gate} className=" text-blue-500 font-medium hover:underline cursor-pointer">Login here</span>
                  </p>
      </div>
    </div>
  );
}
