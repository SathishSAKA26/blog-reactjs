import React, { useState } from "react";
// Add pages 
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import AddEditBlog from "./pages/AddEditBlog";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
// Add Routes the react dom
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";

const App = () => {
  const [active, setActive] = useState("home");
  return (
    <div className="main">
      <NavBar setActive={setActive} active={active} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/create" element={<AddEditBlog />} />
        <Route path="/update/:id" element={<AddEditBlog />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
};

export default App;
