import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import star from "../../../icons/start-favorite-svgrepo-com.svg";
import SimilarProducts from "./SimilarProducts.jsx";
import { db } from "../../../Firebase/FireStore.js";


export default function ProductDetails() {
  let [productData, setProductData] = useState([]);
  let [chooseImg, setChooseImg] = useState("");
  let { uid } = useParams();

  async function getProductData() {
    let data = [];
    let q = query(
      collection(db, "Products"),
      where("uid", "==", uid)
    );
    let querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      data = [...data, doc.data()];
    });
    setProductData(data);
  }

  function getTop() {
    scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    getProductData();
    getTop();
  }, [uid]);


  function handleMainImg(e) {
    setChooseImg(e);
  }

  function calculateDiscount(e) {
    if (e.discount !== 0) {
      return e.price - (e.price * e.discount) / 100;
    } else {
      return e.price;
    }
  }


  return (
    <div className="relative w-full">
      <div className="h-16 bg-pramiry fixed top-0 z-10 start-0 w-full"></div>
      <div className="h-16 bg-pramiry w-full"></div>

      {productData.length ? (
        <div className="lg:w-4/5 mx-auto grid grid-cols-6 gap-4 p-8">
          <div className="col-span-2 lg:col-span-1 flex flex-col gap-2">
            <img
              onClick={() => handleMainImg(productData[0].imgUrl)}
              src={productData[0].imgUrl}
              className=" h-40 object-cover w-full rounded-2xl"
              alt=""
            />
            <img
              src={productData[0].imgUrl}
              className=" h-40 object-cover w-full rounded-2xl"
              alt=""q
            />
            <img
              src={productData[0].imgUrl}
              className=" h-40 object-cover w-full rounded-2xl"
              alt=""
            />
          </div>
          <div className="col-span-4 lg:col-span-3 relative">
            <img
              src={chooseImg ? chooseImg : productData[0].imgUrl}
              alt=""
              className="h-[31rem] w-full rounded-xl lg:object-cover "
            />

            <button className="absolute lg:top-8 h-12 w-12 rounded-full group  flex justify-center items-center bg-secondary lg:end-8 end-2 top-3 ">
              <i className="fa-regular fa-heart  text-white fa-xl group-hover:font-bold  hover:fill-white "></i>
            </button>
          </div>

          <div className="lg:col-span-2 col-span-6 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <p className="text-3xl text-pramiry font-semibold">
                {productData[0].name}
              </p>

              <p className="text-pramiry text-2xl">
                {calculateDiscount(productData[0])} $
              </p>

              <p className="text-lg text-pramiry  leading-loose">
                {productData[0].desc}
              </p>
            </div>

            <p className="text-xl">
              <span className="font-semibold">Color:</span>{" "}
              {productData[0].color}
            </p>

            <div>
              {productData[0].availabilty === true ? (
                <button
                  onClick={() => handdleCart(item)}
                  className="text-center p-3   bg-pramiry text-white font-semibold rounded-xl w-full active:scale-95 cursor-pointer transition"
                >
                  Add To Cart
                </button>
              ) : (
                <button
                  disabled
                  className="text-center p-3  bg-gray-200 text-white font-semibold rounded-xl w-full"
                >
                  Sold Out
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="lg:w-4/5 mx-auto grid grid-cols-6 gap-4 p-8">
          <div className="col-span-2 lg:col-span-1 flex flex-col gap-3">
            <div className="w-full h-40 bg-gray-300 animate-pulse rounded-2xl"></div>
            <div className="w-full h-40 bg-gray-300 animate-pulse rounded-2xl"></div>
            <div className="w-full h-40 bg-gray-300 animate-pulse rounded-2xl"></div>
          </div>

          <div className="col-span-4 lg:col-span-3">
            <div className="w-full h-[31rem] bg-gray-300 animate-pulse rounded-2xl"></div>
          </div>

          <div className="col-span-6 lg:col-span-2 flex flex-col gap-2 ">
            <p className="bg-gray-300 animate-pulse h-5 rounded-2xl w-1/2"></p>
            <p className="bg-gray-300 animate-pulse h-5 rounded-2xl w-1/2"></p>
            <p className="bg-gray-300 animate-pulse h-5 rounded-2xl w-1/2"></p>
            <p className="bg-gray-300 animate-pulse h-5 rounded-2xl w-1/3"></p>
            <p className="bg-gray-300 animate-pulse h-5 rounded-2xl w-1/3"></p>
            <p className="bg-gray-300 animate-pulse h-5 rounded-2xl w-1/3"></p>
          </div>
        </div>
      )}

      <div className="p-10">
        <p className="w-full text-center text-2xl font-semibold p-10 ">
          Rating
        </p>

        {productData.length !== 0 ? (
          <div className="w-full p-10">
            {productData.length !== 0 ? (
              <div className="flex lg:flex-row flex-col gap-6 lg:justify-evenly">
                {productData[0].reviews.map((item) => (
                  <div className="h-40 w-64 rounded-xl flex flex-col  justify-between p-4 border shadow-lg ">
                    <p>date</p>

                    <p>{item.review}</p>

                    <div className="bg-[#8fc83d] flex px-3 p-1 w-fit rounded-full ">
                      <img src={star} alt="star" className="w-5 " />

                      <p className="text-md  text-white">{item.rate}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p></p>
            )}
          </div>
        ) : (
          <div className=" flex justify-center p-10">
            <div className="h-40 w-64 rounded-xl flex flex-col gap-2 p-4 border shadow-lg">
              <div className="h-10 rounded-lg w-40 animate-pulse bg-gray-300 "></div>

              <div className="h-6 rounded-lg w-32 animate-pulse bg-gray-300 "></div>

              <div className="h-6 rounded-lg w-24 animate-pulse bg-gray-300 "></div>
            </div>
          </div>
        )}
      </div>

      <SimilarProducts product={productData[0]} getTop={getTop} />
    </div>
  );
}
