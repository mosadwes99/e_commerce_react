import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../imgs/Log/logo.webp";
import { CSSTransition } from "react-transition-group";
import Cookies from "universal-cookie";
import { signOut } from "firebase/auth";
import { auth } from "../../../Firebase/FireStore";
import { useDispatch, useSelector } from "react-redux";
import { getHref } from "../../../Redux/hrefSlice.js";

export default function sidebar(props) {
  let Cookie = new Cookies();
  let navigate = useNavigate();
  let [currentUser, setCurrentUser] = useState(Cookie.get("currentUser"));
  let parentTransitionRef = useRef(null);
  let transitonRef = useRef(null);
  let dispatch = useDispatch();
  let href = useSelector((state) => state.href.href);

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

  function liStyle(data) {
    if (data.href == href) {
      return "mb-6 ms-8 text-yellow-500 hover:scale-105";
    } else {
      return "mb-6 ms-8 hover:text-yellow-500 hover:scale-105";
    }
  }

  function handdleClick(data) {
    dispatch(getHref(data.href));
    props.SetIsOpen(false);
  }

  function logOut() {
    signOut(auth)
      .then(() => {
        Cookie.remove("currentUser");
      })
      .then(() => {
        setCurrentUser(null);
      })
      .then(() => {
        props.SetIsOpen(false);
      })
      .then(() => {
        navigate("/login");
      });
  }

  return (
    <>
      <CSSTransition
        nodeRef={parentTransitionRef}
        in={props.isOpen}
        timeout={100}
        classNames="fade"
        unmountOnExit
      >
        <div
          className="h-screen fixed top-0  w-full bg-black/40"
          onClick={() => props.SetIsOpen(false)}
          ref={parentTransitionRef}
        ></div>
      </CSSTransition>

      <CSSTransition
        nodeRef={transitonRef}
        in={props.isOpen}
        timeout={300}
        unmountOnExit
        classNames="slide"
      >
        <div
          className="bg-[#133a5e] h-screen w-[320px] fixed top-0 "
          ref={transitonRef}
        >
          <div className="p-8">
            <Link to="/" className="flex justify-center items-center">
              <img src={logo} className=" w-[35px]" />
              <span className="text-white text-[25px]  font-semibold">
                Furnival
              </span>
            </Link>
          </div>

          <div className="text-white text-[18px] font-semibold ">
            <ul className="flex flex-col ">
              {navData.map((data, index) => (
                <li
                  key={index}
                  className={liStyle(data)}
                  onClick={() => handdleClick(data)}
                >
                  <Link to={data.href}>{data.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {currentUser ? (
            <div
              className="ms-8 cursor-pointer text-white  mt-32"
              onClick={logOut}
            >
              <span className="text-[18px] font-semibold">LOG OUT</span>
              <span>
                <i className=" ms-4 fa-solid fa-arrow-right-from-bracket text-white"></i>
              </span>
            </div>
          ) : (
            ""
          )}
        </div>
      </CSSTransition>
    </>
  );
}
