import React from "react";
import { A11y, FreeMode, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CuroselButton from "../Home/CuroselButton.jsx";
import { Link } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../Firebase/FireStore.js";

export default function SimilarProducts(props) {
  let { product , getTop } = props;
  let [similar, setSimilar] = useState([]);

  async function getSimilerProducts() {
    let data = [];
    let q = query(
      collection(db, "Products"),
      where("cate", "==", product.cate),
      where("uid", "!=", product.uid)
    );
    let querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      data = [...data, doc.data()];
    });
    setSimilar(data);
  }

  useEffect(() => {
    getSimilerProducts()
    console.log(product);
  }, [product]);

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
        className="curoselProduct"
      >
        <div className="flex justify-between items-center w-[90%] md:w-full pb-10">
          <div className="text-[#133a5e] font-bold text-[1.5rem]">
            Similar Product
          </div>

          <CuroselButton />
        </div>

        {similar.map((item, index) => (
          <SwiperSlide key={index} className="">
            <div className={`slideCuroselHome rounded-xl`}>
              <div className="overflow-hidden rounded-xl w-full h-full">
                <Link to={`/productdetails/${item.uid}`} onClick={getTop}>
                  <img
                    src={item.imgUrl}
                    className="w-full object-cover lg:object-fill  h-full -z-10 rounded-xl overflow-hidden hover:scale-125 transition duration-500"
                    alt=""
                  />
                </Link>
              </div>

              <div className="w-[90%] lg:h-2/5 rounded-xl z-10 absolute flex flex-col justify-between  shadow-lg  -bottom-12 left-1/2 -translate-x-1/2 bg-white p-3 ">
                <div>
                  <p className="text-md text-start font-semibold">
                    {item.name}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex justify-center items-center w-5/6 ">
                    {item.availabilty === true ? (
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

                  <div className="text-end">
                    <p className="text-green-600">{calculateDiscount(item)}$</p>

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
