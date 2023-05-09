import React from 'react'
// !Add image to images file
import Image from "../assets/images/blogapp.png";
// import Link
import { Link } from "react-router-dom";

const NavBar = ({ active, setActive }) => {
  return (
    <div className="bg-green-700 w-full h-14 fixed">
      <div className="flex items-center justify-between text-white font-bold">
        <div className="flex w-[45%]">
          <div className="w-[40%] mt-[8px]">
            <img src={Image} alt="logo" className="cursor-pointer" />
          </div>
          <div className="flex items-center mt-[15px]  justify-around text-xl w-full cursor-pointer mr-5">
            <Link to="/">
              <p className={`text-white hover:text-black  ${active === "home" ? "active" : ""}`}
                onClick={() => setActive("home")}>Home</p>
            </Link>
            <Link to="/create">
              <p className={`text-white hover:text-black  ${active === "create" ? "active" : ""}`}
                onClick={() => setActive("create")}>Create</p>
            </Link>
            <Link to="/about">
              <p className={`text-white hover:text-black  ${active === "about" ? "active" : ""}`}
                onClick={() => setActive("about")}>About</p>
            </Link>
          </div>
        </div>
        <div className="text-xl font-bold mr-20 mb-2 cursor-pointer">
          <Link to="/auth">
            <div className={`text-white hover:text-black  ${active === "login" ? "active" : ""}`}
              onClick={() => setActive("login")}>Login</div>
          </Link>
        </div>
      </div>
    </div >
  )
}

export default NavBar;