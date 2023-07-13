import React, { useEffect, useState } from "react";
// Add pages 
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import AddEditBlog from "./pages/AddEditBlog";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
// Add Routes the react dom
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import { ToastContainer } from "react-toastify";
import auth from "./firebase";
import { signOut } from "firebase/auth";

const App = () => {
  const [active, setActive] = useState("home");
  const [user, setUser] = useState(null);

  const naivgate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  //logout function
  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      setActive("login");
      naivgate("/auth");
    })
  }

  return (
    <div className="main">
      <NavBar setActive={setActive} active={active} user={user} handleLogout={handleLogout} />
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/" element={<Home setActive={setActive} user={user} />} />
        <Route path="/detail/:id" element={<Detail setActive={setActive} />} />
        <Route path="/create" element={user?.uid ? <AddEditBlog user={user} /> : <Navigate to="/" />} /> //user && user.uid
        <Route path="/update/:id" element={user?.uid ? <AddEditBlog user={user} setActive={setActive} /> : <Navigate to="/" />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<Auth setActive={setActive} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
};

export default App;
