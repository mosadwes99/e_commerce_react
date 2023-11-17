import React, { useEffect, useState } from "react";
import { db } from "../../Firebase/FireStore";
import { collection, getDocs } from "firebase/firestore";
import Slider from "./Slider.jsx";
import Curosel from "./Curosel.jsx";
import Grid from "./Grid.jsx";
import Services from "./Services.jsx";

export default function Home() {
  let [cateData, setCateData] = useState([]);
  let [productData, setProductData] = useState([]);

  async function getCateData() {
    let data = [];
    let querySnapshot = await getDocs(collection(db, "category"));
    querySnapshot.forEach((doc) => {
      data = [...data, doc.data()];
    });
    setCateData(data);
  }

  async function getProductData() {
    let data = [];
    let querySnapshot = await getDocs(collection(db, "Products"));
    querySnapshot.forEach((doc) => {
      data = [...data, doc.data()];
    });
    setProductData(data);
  }

  useEffect(() => {
    if (cateData.length === 0) {
      getCateData();
    }
    if (productData.length === 0) {
      getProductData();
    }
  }, []);

  return (
    <>
      <Slider />
      <Curosel cateData={cateData} productData={productData} />
      <Grid productData={productData} />
      <Services />
    </>
  );
}
