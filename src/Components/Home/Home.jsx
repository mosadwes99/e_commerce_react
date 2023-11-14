import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import Slider from "./Slider.jsx";
import Curosel from "./Curosel.jsx";

export default function Home() {
  let cookie = new Cookies();
  let currentUser = cookie.get("currentUser");

  return (
    <>
      <Slider />
      <Curosel />
    </>
  );
}
