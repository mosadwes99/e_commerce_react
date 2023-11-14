import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import Nav from "../Nav/nav.jsx";
import Footer from "../Footer/Footer.jsx";

export default function Layout() {
  let [scroll, setScroll] = useState(0);

  
  function getScroll() {
    setScroll(window.scrollY)
  }

  window.addEventListener("scroll", getScroll);
  return (
    <>
    <div className="h-[5000px] bg">
        <Nav scroll={scroll}  />
        <Outlet></Outlet>
        <Footer />
    </div>
    </>
  );
}
