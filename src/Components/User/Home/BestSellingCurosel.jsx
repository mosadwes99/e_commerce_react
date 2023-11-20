import React, { useEffect, useState } from "react";
import { A11y, FreeMode, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CuroselButton from "./CuroselButton.jsx";
import star from "../../../icons/start-favorite-svgrepo-com.svg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getHref } from "../../../Redux/hrefSlice.js";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../Firebase/FireStore.js";

export default function BestSellingCurosel() {
  let dispatch = useDispatch();
  let [productData, setProductData] = useState([]);

  async function getProductData() {
    let data = [];
    let q = query(collection(db, "Products"), where("bestSelling", "==", true));
    let querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      data = [...data, doc.data()];
    });
    setProductData(data);
  }

  useEffect(() => {
    getProductData();
  }, []);

  function calculateRate(e) {
    let count = 0;
    e.map((item) => (count = item.rate + count));
    if (e.length) {
      return count / e.length;
    } else {
      return "";
    }
  }

  function calculateDiscount(e) {
    if (e.discount !== 0) {
      return e.price - (e.price * e.discount) / 100;
    } else {
      return e.price;
    }
  }

  return (
    <>
      <Swiper
        spaceBetween={50}
        freeMode={true}
        breakpoints={{
          "@0.00": {
            slidesPerView: 1,
            spaceBetween: 5,
          },
          "@0.35": {
            slidesPerView: 1,
            spaceBetween: 5,
          },
          "@0.75": {
            slidesPerView: 3,
            spaceBetween: 5,
          },
          "@1.00": {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          "@1.50": {
            slidesPerView: 4,
            spaceBetween: 10,
          },
        }}
        modules={[Navigation, Pagination, A11y, FreeMode]}
        className="curoselHome"
      >
        <div className="flex justify-between items-center w-[90%] md:w-full mb-10">
          <div className="text-[#133a5e] font-bold text-[1.5rem]">
            Best Selling
          </div>

          <CuroselButton />
        </div>
        {productData
          .map((item, index) => (
            <SwiperSlide key={index} className="">
              <div className={`slideCuroselHome rounded-xl`}>
                <div className="overflow-hidden rounded-xl w-full h-full">
                  <Link
                    to={`/productdetails/${item.uid}`}
                    onClick={() => dispatch(getHref("/shop"))}
                  >
                    <img
                      src={item.imgUrl}
                      className="w-full object-cover h-full -z-10 rounded-xl overflow-hidden hover:scale-125 transition duration-500"
                      alt=""
                    />
                  </Link>
                </div>

                <div className="w-[90%] lg:h-2/6 rounded-xl z-10 absolute flex flex-col justify-between  shadow-lg  -bottom-12 left-1/2 -translate-x-1/2 bg-white p-3 ">
                  <div>
                    <p className="text-md text-start font-semibold">
                      {item.name}
                    </p>
                  </div>

                  <div className="flex justify-between items-end">
                    <div className="flex gap-1 items-center">
                      <div className="bg-[#8fc83d] flex px-3 p-1 rounded-full ">
                        <img src={star} alt="star" className="w-5 fill-white" />

                        <p className="text-md  text-white">
                          {calculateRate(item.reviews)}
                        </p>
                      </div>

                      <p className="text-black/50">({item.reviews.length})</p>
                    </div>

                    <div className="text-end">
                      <p className="text-green-600">
                        {calculateDiscount(item)}$
                      </p>

                      {item.discount !== 0 && (
                        <p className="line-through text-red-400 text-sm">
                          {item.price}$
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}
