import React, { useState } from "react";
import "./Loginpage.css";
import { useNavigate } from "react-router-dom";
import { HiOutlineMail, HiUser, HiPhone, HiLockClosed } from "react-icons/hi";

export const Loginpage = () => {
  const navgate = useNavigate();
  const gate = () => {
    navgate("/register");
  };
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
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Login successful", data);
        localStorage.setItem("access_token", data.access_token); // Save the token
        localStorage.setItem("username", formData.username); // Save the username
        gate2();
        // Redirect or perform other actions on successful login
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error (e.g., display error message)
      });
  };

  return (
    <div className="App">
      <div className="auth-form-container">
        <section className="form-container">
          <form
            action="/my-handling-form-page"
            method="post"
            className="Loginpage-form"
          >
            <h2 className="text-black font-bold text-2xl flex justify-start ml-3">
              Login Here
            </h2>
            <h4 className="text-black text-md  flex justify-start ml-3">
              Welcome
            </h4>
            <br></br>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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

            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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

            <button
              type="submit"
              style={{
                borderRadius: 40,
                width: "50%",
                background: "#0bacc5",
                borderBlockColor: "white",
                marginTop: "10px",
              }}
              onClick={handleSubmit}
              className="link-btn3 loginBTN"
            >
              <b>Login</b>
            </button>

            <br></br>
            <button onClick={gate} className="link-btn loginBTN">
              <b>SignUp</b>
            </button>
            <button className="link-btn2 loginBTN">
              <b>Forget Password?</b>
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};
