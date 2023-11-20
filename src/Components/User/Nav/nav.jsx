import React, { useState } from "react";
import logo from "../../../imgs/Log/logo.webp";
import { Link } from "react-router-dom";
import SideBar from "./sidebar.jsx";
import LoginIcons from "./LoginIcons";
import { useDispatch, useSelector } from "react-redux";
import { getHref } from "../../../Redux/hrefSlice.js";

export default function nav(props) {
  let [active , setActive] = useState(location.pathname)
  let [isOpen , setIsOpen] = useState(false)

  let dispatch = useDispatch()
  let href = useSelector((state)=>state.href.href)

  let navData = [
    {
      href: "/",
      name: "Home",
    },
    {
      href: "/shop",
      name: "Shop",
    },
    {
      href: "/blog",
      name: "Blog",
    },
    {
      href: "/about",
      name: "About",
    },
    {
      href: "/contact",
      name: "Contact",
    },
  ];



function liStyle(data){
  if (data.href == href) {
    return "me-9 text-yellow-500 hover:scale-105";
  } else {
    return "me-9 hover:text-yellow-500 hover:scale-105";
  }
}

  return (
    <>
      <div
        className="h-[65px] transition-colors duration-300 fixed z-50 top-0  w-full"
        style={{
          backgroundColor: props.scroll < 150   ? "transparent" : "#133a5e",
        }}
      >
        <div className="container h-full w-[85%] lg:w-[78%] flex justify-between items-center">
          <div className="block lg:hidden" onClick={()=>setIsOpen(true)}>
            <i className="cursor-pointer fa-solid fa-bars fa-lg text-white"></i>
          </div>

            <div>
              <Link onClick={()=>dispatch(getHref("/"))} to="/" className="flex items-center">
                <img src={logo} className="md:w-[40px ] w-[35px]" />
                <span className="text-white text-[25px] md:text-[29px] font-semibold">
                  Furnival
                </span>
              </Link>
            </div>


          <div className="text-white text-[18px] font-semibold hidden lg:block">
            <ul className="flex ">
              {navData.map((data , index) => 
                <li  key={index} className={liStyle(data)} onClick={()=>dispatch(getHref(data.href))}>
                  <Link to={data.href}>{data.name}</Link>
                </li>
              )}
            </ul>
          </div>

              <LoginIcons active={active} setActive={setActive}/>
        </div>

        <SideBar isOpen={isOpen} SetIsOpen={setIsOpen} active={active} setActive={setActive}/>
      </div>
    </>
  );
}
