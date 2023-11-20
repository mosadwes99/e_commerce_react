import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../imgs/Log/logo.webp";
import { CSSTransition } from "react-transition-group";
import Cookies from "universal-cookie";
import { auth, db } from "../../Firebase/FireStore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getHref } from "../../Redux/hrefSlice.js";

export default function SignupPage() {
  let navigate = useNavigate();
  let cookie = new Cookies();
  let transitonRef = useRef(null);
  let dispatch = useDispatch();

  let [isLoading, setIsLoading] = useState(false);

  let [errorMessage, setErrorMessage] = useState("");

  let [transition, setTransition] = useState(false);
  let [isTrue , setIsTrue] = useState(false)

  let [getData, setGetData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  let [dataError, setDataError] = useState({
    email: null,
    password: null,
    userName: null,
    confirmPassword: null,
  });

  useEffect(() => {
    setTransition(true);
  }, []);
  useEffect(() => {}, []);

  function changeData(e) {
    let email = getData.email;
    let password = getData.password;
    let userName = getData.userName;
    let confirmPassword = getData.confirmPassword;
    let error = dataError;
    //handdle email data
    if (e.target.name === "email") {
      email = e.target.value;
      if (email.includes(".co") || email.includes(".ne")) {
        error.email = "";
      } else if (email === "") {
        error.email = "Email is required";
      } else {
        error.email = "Invalid email address";
      }
      setGetData({ ...getData, email });
    }
    //handdle password data
    else if (e.target.name == "password") {
      password = e.target.value;
      if (password.length >= 6) {
        error.password = "";
      } else if (password === "") {
        error.password = "Password is required";
      } else {
        error.password = "Password must be at least 6 characters long";
      }
      setGetData({ ...getData, password });
    }
    //handdle userName data
    else if (e.target.name == "userName") {
      userName = e.target.value;
      if (userName.length > 2 && userName.length < 20) {
        error.userName = "";
      } else if (userName.length == 0) {
        error.userName = "userName is required";
      } else if (userName.length <= 2) {
        error.userName = "It must be at least 3 characters long";
      } else {
        error.userName = "It must be less than 20 characters long";
      }
      setGetData({ ...getData, userName });
    }
    //handdle confirmPassword data
    else {
      confirmPassword = e.target.value;
      if (confirmPassword == getData.password) {
        error.confirmPassword = "";
      } else {
        error.confirmPassword = "They're not matching";
      }
      setGetData({ ...getData, confirmPassword });
      setDataError(error);
    }
  }

  function updateData() {
    setDoc(doc(db, "Users", auth.currentUser.uid), {
      uid: auth.currentUser.uid,
      userName: getData.userName,
      role: "customer",
      imgUrl: `/Users/profilePicture/defaultUserImage.webp`,
      likedProducts: [],
      address: "",
    });
  }

  let dataRquired = (e) => {
    setIsTrue(true)
    for (let i = 0; i < 4; i++) {
      let error = dataError;
      if (error[e.target[i].name] == null) {
        error[e.target[i].name] = `${e.target[i].name} is required`;
      }
      setDataError(error);
    }
    console.log(dataError);
  };

  function loginNotify() {
    toast.success(`Account has been created successfully`, {
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

  async function submitForm(e) {
    e.preventDefault();
    if (
      dataError.userName == "" &&
      dataError.email == "" &&
      dataError.password == "" &&
      dataError.confirmPassword == ""
    ) {
      setIsLoading(true);
      await createUserWithEmailAndPassword(
        auth,
        getData.email,
        getData.password
      )
        .then(() => {
          updateData();
        })
        .then(loginNotify)
        .then(() => {
          navigate("/login");
        })
        .catch(() => {
          setIsLoading(false);
          setErrorMessage("The email already exists");
        });
    } else {
      dataRquired(e);
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
                <Link to="/" onClick={() => dispatch(getHref("/"))}>
                  <img src={logo} width="100px" />
                </Link>
              </div>

              <span className="text-[30px] font-bold text-[#133a5e] -mt-3 mb-[18px] text-center inline-block w-full ">
                Create Account
              </span>

              <form onSubmit={(e) => submitForm(e)}>
                <div className="w-full mb-2">
                  <div className="text-lg mb-3 font-semibold  text-[#133a5e]">
                    <label htmlFor="userName">
                      User name <span className="text-red-600">*</span>
                    </label>
                  </div>
                  <input
                    name="userName"
                    type="text"
                    id="userName"
                    className="signInput"
                    onChange={(e) => changeData(e)}
                  />
                  <span className="text-red-500">{dataError.userName}</span>
                </div>

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
                  <span className="text-red-500">{dataError.password}</span>
                </div>

                <div className="w-full mb-[28px]">
                  <div className="text-lg mb-3 font-semibold text-[#133a5e]">
                    <label htmlFor="confirmPassword">
                      Confirm Password <span className="text-red-600">*</span>
                    </label>
                  </div>
                  <input
                    name="confirmPassword"
                    type="password"
                    id="confirmPassword"
                    className=" signInput"
                    onChange={(e) => changeData(e)}
                  />
                  <span className="text-red-500">
                    {dataError.confirmPassword}
                  </span>
                  <span className="text-red-500">{errorMessage}</span>
                </div>

                {isLoading ? (
                  <button className="submitButton ">
                    <div className="submitSpinner"></div>
                  </button>
                ) : (
                  <button className="submitButton">SIGN UP</button>
                )}
              </form>

              <div className="text-center text-[#133a5e] text-[18px] mt-[12px] font-semibold font-sans  ">
                <span>Already have account, </span>
                <Link to="/login">
                  <span className="focus:underline text-orange-400">
                    Sign in
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
