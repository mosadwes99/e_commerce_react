import React, { useEffect } from "react";
import Slider from "./Slider.jsx";
import Curosel from "./Curosel.jsx";
import Grid from "./Grid.jsx";
import Services from "./Services.jsx";
import BestSellingCurosel from "./BestSellingCurosel.jsx";

export default function Home() {



  

  function getTop() {
    scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    getTop();
  }, []);

  return (
    <>
      <Slider />
      <Curosel />
      <BestSellingCurosel/>
      <Grid />
      <Services />
    </>
  );
}
