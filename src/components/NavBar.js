import React from 'react'
// !Add image to images file
import Image from "../assets/images/blog.png";

const NavBar = () => {
  return (
    <div className="bg-blue-950 w-full h-16 ">
      <div className="nav-container">
        <div className="nav-rightContainer">
          <div className="logo-content">
            <img src={Image} alt="logo" className="w-[15%]" />
          </div>
          <div className="three-page">
            <p className="p-home">Home</p>
            <p className="p-create">Create</p>
            <p className="p-about">About</p>
          </div>
        </div>
        <div className="nav-leftContainer">
          <div className="login">Login</div>
        </div>
      </div>
    </div>
  )
}

export default NavBar;