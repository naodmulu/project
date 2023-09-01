import React, {useState} from "react";
import './Loginpage.css';
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const Loginpage = (props) => {
  const navgate = useNavigate();
  const gate = () => {
    navgate("/register");
  };
  const navgate2 = useNavigate();
  const gate2 = () => {
    navgate("/home");
  };
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
                <br></br>
            <button onClick={gate} className="link-btn" ><b>singup</b></button>
            <button className="link-btn2"><b>forget password?</b></button>
            </form>
            </section>
            </div>
        </div>
        
    )
}