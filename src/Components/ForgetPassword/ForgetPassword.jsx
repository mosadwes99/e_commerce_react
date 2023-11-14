import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import logo from "../../imgs/Log/logo.webp";
import { auth } from "../../Firebase/FireStore";
import { toast } from "react-toastify";
import { sendPasswordResetEmail } from "firebase/auth";

export default function ForgetPassword() {
  let transitonRef = useRef(null);
  let [transition, setTransition] = useState(false);
  let [isLoading, setIsLoading] = useState(false);
  let [getData, setGetData] = useState("");

  let navigate = useNavigate()
  
  useEffect(() => {
    setTransition(true);
  }, []);
  
  function successNotify() {
    toast.success(`Reset link sent to email`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  function errorNotify() {
    toast.error(`There's no user with this email`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }


  function submitForm(e) {
    e.preventDefault();
    setIsLoading(true)
    sendPasswordResetEmail(auth, getData)
      .then(successNotify)
      .then(()=>{
        navigate("/login")
      })
      .catch(() => {
        errorNotify()
        setIsLoading(false)
      });
  }

  return (
    <>
      <div className="signBackground">
        <div className="bg-black/40 flex justify-center items-center h-screen w-full">
          <CSSTransition
            nodeRef={transitonRef}
            in={transition}
            timeout={400}
            classNames="fade"
          >
            <div
              ref={transitonRef}
              className="bg-white p-[56px] rounded-2xl w-full md:pt-30  md:w-[460px] h-screen md:h-auto md:block flex flex-col justify-center"
            >
              <div className="w-full flex justify-center mb-0">
                <Link to="/">
                  <img src={logo} width="100px" />
                </Link>
              </div>

              <div className="text-center text-xl w-full font-bold text-[#133a5e] mb-4">
                Email
              </div>

              <form onSubmit={(e) => submitForm(e)}>
                <div>
                  <input
                    type="email"
                    className="signInput mb-5 placeholder:text-xl p-3"
                    placeholder="Enter your email..."
                    onChange={(e) => setGetData(e.target.value)}
                  />
                </div>

                {isLoading ? (
                  <button className="submitButton ">
                    <div className="submitSpinner"></div>
                  </button>
                ) : (
                  <button className="submitButton text-[19]">SEND CODE</button>
                )}
              </form>
            </div>
          </CSSTransition>
        </div>
      </div>
    </>
  );
}
