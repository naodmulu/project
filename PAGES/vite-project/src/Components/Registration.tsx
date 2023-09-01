import React from "react";
import "./registration.css";
import { HiOutlineMail, HiUser, HiPhone, HiLockClosed } from "react-icons/hi";

const Registration = () =>{
  return (
    <div className="flex">
      <div
        className="w-8 leftdiv"
        style={{
          background: "#1363DF",
          width: "65%",
          height: 1000,
          marginRight: 100,
        }}
      >
      </div>
      <div className="form">
        <h1>Hello!</h1>
        <h2>Sign Up to Get Started</h2>

        <form className="">
          <label
            htmlFor="email-address-icon"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            First Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
              <HiUser />
            </div>
            <input
              style={{
                height: 40,
                width: "95%",
                borderColor: "white-gray-100",
                borderWidth: 1,
                borderRadius: 20,
              }}
              type="text"
              id="email-address-icon"
              className="bg-gray-50 border border-gray-100 text-gray-900 text-md rounded-lg focus:ring-blue-50 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-white-700 dark:border-gray-100 dark:placeholder-gray-200 dark:text-gray dark:focus:ring-blue-200 dark:focus:border-blue-200 borderRadius: 20"
              placeholder="First Name"
            />
          </div>
          <label
            htmlFor="email-address-icon"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Last Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
              <HiUser className="icon" />
            </div>
            <input
              style={{
                height: 40,
                width: "95%",
                borderColor: "white-gray-100",
                borderWidth: 1,
                borderRadius: 20,
              }}
              type="text"
              id="email-address-icon"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Last Name"
            />
          </div>
          <label
            htmlFor="email-address-icon"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Username
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
              <HiUser className="icon" />
            </div>
            <input
              style={{
                height: 40,
                width: "95%",
                borderColor: "white-gray-100",
                borderWidth: 1,
                borderRadius: 20,
              }}
              type="text"
              id="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Username"
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
              style={{
                height: 40,
                width: "95%",
                borderColor: "white-gray-100",
                borderWidth: 1,
                borderRadius: 20,
              }}
              type="text"
              id="email-address-icon"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Email Address"
            />
          </div>

          <label
            htmlFor="email-address-icon"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Phone Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
              <HiPhone className="icon" />
            </div>
            <input
              style={{
                height: 40,
                width: "95%",
                borderColor: "white-gray-100",
                borderWidth: 1,
                borderRadius: 20,
              }}
              type="number"
              id="phone"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Phone Number"
            />
          </div>
          <label
            htmlFor="email-address-icon"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            New Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
              <HiLockClosed className="icon" />
            </div>
            <input
              style={{
                height: 40,
                width: "95%",
                borderColor: "white-gray-100",
                borderWidth: 1,
                borderRadius: 20,
              }}
              type="text"
              id="email-address-icon"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="New Password"
            />
          </div>
          <label
            htmlFor="email-address-icon"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
              <HiLockClosed className="icon" />
            </div>
            <input
              style={{
                height: 40,
                width: "95%",
                borderColor: "white-gray-100",
                borderWidth: 1,
                borderRadius: 20,
              }}
              type="text"
              id="email-address-icon"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Confirm Password"
            />
          </div>
          <label
            htmlFor="email-address-icon"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirm Password
          </label>
          <div className="flex items-center mb-4">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="default-checkbox"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-600"
            >
              I agree to the terms and conditions that apply!
            </label>
          </div>
          <label
            htmlFor="email-address-icon"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirm Password
          </label>
        </form>
        <div className="button">
          <button
            style={{
              borderRadius: 40,
              width: "95%",
              background: "#1363DF",
              borderBlockColor: "white",
            }}
            type="button"
            className="py-2.5 px-5 mr-2 mb-2 text-lg font-large font-semibold font-Arial text-white-900 focus:outline-white bg-white rounded-lg border border-gray-100 hover:bg-blue-100 hover:text-white-700 focus:z-10 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-100 dark:bg-blue-100 dark:text-blue-100 dark:border-blue-100 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Registration;