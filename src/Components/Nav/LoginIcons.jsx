import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { auth } from "../../Firebase/FireStore";
import { signOut } from "firebase/auth";

export default function LoginIcons(props) {
  let cookie = new Cookies();
  let navigate = useNavigate();
  let currentUser = cookie.get("currentUser");

  function logOut() {
    signOut(auth)
      .then(() => {
        cookie.remove("currentUser");
      })
      .then(() => {
        navigate("/login");
      });
  }
  return (
    <>
      {currentUser ? (
        <div className="lg:px-10 lg:ms-0 -me-4 flex items-center ">
          <div className="me-4 hover:bg-black/10 p-3 rounded-md ">
            <Link onClick={() => props.setActive("/cart")} to="/cart">
              <i className="  fa-lg  fa-solid  fa-bag-shopping text-white"></i>
            </Link>
          </div>

          <div className="hidden lg:flex ">
            <div className="me-4 hover:bg-black/10 p-3 rounded-md ">
              <Link
                onClick={() => props.setActive("/wishlist")}
                to="/wishlist"
              >
                <i className=" fa-lg  text-white fa-regular fa-heart"></i>
              </Link>
            </div>

            <div className="logOutNav relative">
              <div className="me-4 hover:bg-black/10 p-3 rounded-md ">
                <Link
                  onClick={() => props.setActive("/profile")}
                  to="/profile"
                >
                  <i className=" fa-lg  text-white fa-regular fa-user"></i>
                </Link>
              </div>

              <button
                className="logOutNavButton absolute  left-0 w-24 px-4 py-2  rounded-md bg-white"
                onClick={logOut}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-yellow-500 p-[4px] lg:px-6 px-5  rounded-3xl text-sm font-semibold">
          <Link to="/login" className="text-[#133a5e]">
            LOGIN
          </Link>
        </div>
      )}
    </>
  );
}
