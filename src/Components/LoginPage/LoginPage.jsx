import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../imgs/Log/logo.webp";
import { auth, db } from "../../Firebase/FireStore";
import { signInWithEmailAndPassword } from "firebase/auth";
import Cookies from "universal-cookie";
import { CSSTransition } from "react-transition-group";
import { collection, getDocs, query, where } from "firebase/firestore";
import { toast } from "react-toastify";

export default function LoginPage() {
  let location = useLocation()
  let navigate = useNavigate();
  let cookie = new Cookies();
  let transitonRef = useRef(null);
  let path = location.state?.path || "/"

  let [isLoading, setIsLoading] = useState(false);

  let [errorMessage, setErrorMessage] = useState("");

  let [transition, setTransition] = useState(false);

  let [getData, setGetData] = useState({
    email: "",
    password: "",
  });

  let [dataError, setDataError] = useState({
    email: null,
    password: null,
  });

  useEffect(() => {
    setTransition(true);
  }, []);

  function changeData(e) {
    let email = getData.email;
    let password = getData.password;
    let error = dataError;
    //handdle email data
    if (e.target.name === "email") {
      email = e.target.value;
      if (email.includes(".co") || email.includes(".ne")) {
        error[e.target.name] = "";
      } else if (email === "") {
        error[e.target.name] = "Email is required";
      } else {
        error[e.target.name] = "Invalid email address";
      }
      setGetData({ ...getData, email });
    }
    //handdle password data
    else {
      password = e.target.value;
      if (password.length >= 6) {
        error[e.target.name] = "";
      } else if (password === "") {
        error[e.target.name] = "Password is required";
      } else {
        error[e.target.name] = "Password must be at least 6 characters long";
      }
      setGetData({ ...getData, password });
    }
    setDataError(error);
  }

  async function getDataFireStore() {
    let q = query(
      collection(db, "Users"),
      where("uid", "==", auth.currentUser.uid)
    );
    let querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let Data = doc.data();
      cookie.set("currentUser", Data)
    });
  }

  function loginNotify() {
    toast.success(`welcome Back`, {
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

  function dataRequired() {
    let email = dataError.email;
    let password = dataError.password;
    email = "Email is required";
    password = "Password is required";
    setDataError({ ...dataError, email: email, password: password });
  }

  function emailRequired() {
    let email = dataError.email;
    email = "Email is required";
    setDataError({ ...dataError, email });
  }
//
  function PasswordRequired() {
    let password = dataError.password;
    password = "Password is required";
    setDataError({ ...dataError, password });
  }

  async function submitForm(e) {
    e.preventDefault();
    if (dataError.email == "" && dataError.password == "") {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, getData.email, getData.password)
        .then(getDataFireStore)
        .then(() => {
          navigate(path, { replace: true });
        })
        .then(loginNotify)
        .catch(() => {
          setIsLoading(false);
          setErrorMessage("There are wrong in email or password");
        });
    } else if (dataError.email == null && dataError.password == null) {
      dataRequired();
    } else if (dataError.email == null) {
      emailRequired();
    } else if (dataError.password == null) {
      PasswordRequired();
    }
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
              className="bg-white p-[56px] rounded-2xl w-full md:pt-30  md:w-[430px] h-screen md:h-auto md:block flex flex-col justify-center "
            >
              <div className="w-full flex justify-center mb-0">
                <Link to="/">
                  <img src={logo} width="100px" />
                </Link>
              </div>

              <span className="text-[30px] font-bold text-[#133a5e] -mt-3 mb-[18px] text-center inline-block w-full ">
                Login
              </span>

              <form onSubmit={(e) => submitForm(e)}>
                <div className="w-full mb-2">
                  <div className="text-lg mb-3 font-semibold  text-[#133a5e]">
                    <label htmlFor="email">
                      Email <span className="text-red-600">*</span>
                    </label>
                  </div>
                  <input
                    name="email"
                    type="text"
                    id="email"
                    className="signInput"
                    onChange={(e) => changeData(e)}
                  />
                  <span className="text-red-500">{dataError.email}</span>
                </div>

                <div className="w-full mb-[28px]">
                  <div className="text-lg mb-3 font-semibold text-[#133a5e]">
                    <label htmlFor="password">
                      Password <span className="text-red-600">*</span>
                    </label>
                  </div>
                  <input
                    name="password"
                    type="password"
                    id="password"
                    className=" signInput"
                    onChange={(e) => changeData(e)}
                  />
                  {dataError.password == "" ? (
                    <span className="text-red-500">{errorMessage}</span>
                  ) : (
                    <span className="text-red-500">{dataError.password}</span>
                  )}
                </div>

                {isLoading ? (
                  <button className="submitButton ">
                    <div className="submitSpinner"></div>
                  </button>
                ) : (
                  <button className="submitButton">SIGN IN</button>
                )}
              </form>

              <div className="text-center text-[18px] mt-[12px] text-orange-400 font-semibold font-sans  ">
                <Link to="/forget-password">
                  <span className="hover:underline">forget password ?</span>
                </Link>
              </div>

              <div className="text-center text-[#133a5e]  text-[18px] mt-[12px] font-semibold font-sans  ">
                <span>Don't have account, </span>
                <Link to="/signup">
                  <span className="focus:underline text-orange-400">
                    Sign Up
                  </span>
                </Link>
              </div>
            </div>
          </CSSTransition>
        </div>
      </div>
    </>
  );
}
