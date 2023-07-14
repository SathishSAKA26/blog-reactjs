import React from 'react'
// !Add image to images file
import Image from "../assets/images/blogapp.png";
// import Link
import { Link } from "react-router-dom";

const NavBar = ({ active, setActive, user, handleLogout }) => {
  const userId = user?.uid;

  return (
    <div className="bg-green-700 w-full h-14">
      <div className="flex items-center justify-between text-white font-bold mb-8">
        <div className="flex w-[45%] mb-5">
          <div className="w-[40%] mt-[10px]">
            <img src={Image} alt="logo" className="cursor-pointer" />
          </div>
          <div className="flex items-center mt-[15px]  justify-around text-xl w-full cursor-pointer mr-5">
            <Link to="/">
              <p className={`text-white hover:text-black  ${active === "home" ? "text-yellow-200 underline" : ""}`}
                onClick={() => setActive("home")}>Home</p>
            </Link>
            <Link to="/create">
              <p className={`text-white hover:text-black  ${active === "create" ? "text-yellow-200 underline" : ""}`}
                onClick={() => setActive("create")}>Create</p>
            </Link>
            <Link to="/about">
              <p className={`text-white hover:text-black  ${active === "about" ? "text-yellow-200 underline" : ""}`}
                onClick={() => setActive("about")}>About</p>
            </Link>
          </div>
        </div>
        <div className="text-xl font-bold mr-20 mb-4 cursor-pointer">
          {userId ? (
            <div className="flex items-center">
              <div className="flex items-center mb-3">
                <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="" className="w-8 h-8 rounded-full mt-3 mr-2 mb-3" />
                <div className="text-white   mr-2">{user?.displayName}</div>
              </div>
              <div className="text-white hover:text-black ml-2 mb-4"
                onClick={handleLogout}
              >Logout</div>
            </div>
          ) : (
            <Link to="/auth">
              <div className={`text-white hover:text-black mb-3  ${active === "login" ? "text-yellow-200 underline" : ""}`}
                onClick={() => setActive("login")}>Login</div>
            </Link>
          )}
        </div>
      </div>
    </div >
  )
}

export default NavBar;