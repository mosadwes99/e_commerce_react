import React, { useEffect, useState } from "react";
import homeIcon from "../../../icons/Home.svg";
import { db } from "../../../Firebase/FireStore";
import { collection, getDocs } from "firebase/firestore";
import Loading from "../../../Sections/Loading";
import { Link } from "react-router-dom";

export default function Blog() {
  let [blogs, setBlogs] = useState([]);

  async function getBlogsData() {
    let data = [];
    let querySnapshot = await getDocs(collection(db, "Blogs"));
    querySnapshot.forEach((doc) => {
      data = [...data, doc.data()];
    });
    setBlogs(data);
    console.log(blogs);
  }

  function getTop() {
    scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    getBlogsData();
    getTop();
  }, []);

  return (
    <div className="w-full relative">
      <div className="w-full h-[28rem] bg-[url('/src/imgs/Assets/backgroundBlog.webp')] bg-fixed bg-top bg-conatain md:bg-cover 2xl:bg-contain bg-no-repeat overflow-hidden relative">
        <div className="h-full bg-black/60 flex justify-center items-center text-white ">
          <div className="flex flex-col items-center gap-8">
            <p className="text-4xl font-bold ">Blogs</p>

            <div className="flex gap-1 text-lg">
              <div className="flex gap-1">
                <img src={homeIcon} alt="  " className="w-4" />

                <span className="">Home</span>
              </div>

              <span>/ Blogs</span>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:w-[85%] min-h-[20rem] py-10 lg:p-20 m-auto grid grid-cols-2  ">
        {blogs.map((item, i) => (
          <div
            key={i}
            className="lg:col-span-1 col-span-2 lg:my-24 m-5 lg:m-10 group rounded-3xl overflow-hidden  border-2 "
          >
            <div className="overflow-hidden w-full h-60 lg:h-72 relative ">
              <img
                src={item.imgUrl}
                alt=""
                className=" group-hover:scale-105 transition duration-300 w-full h-full object-cover   "
              />

              <Link to={`/blogdetails/${item.uid}`}>
                <button className="p-4 absolute end-0 z-10 font-semibold text-white top-12 cursor-pointer opacity-100 lg:opacity-0 group-hover:opacity-100  transition duration-300 rounded-s-full bg-secondary lg:px-6">
                  READ MORE
                </button>
              </Link>
            </div>

            <div className="p-4 flex flex-col gap-4">
              <div>
                <p className="text-pramiry text-2xl font-semibold">
                  {item.title}
                </p>

                <p className="font-semibold text-sm text-black/60">
                  {item.date}
                </p>
              </div>

              <div className=" h-1/2 w-full truncate">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
      {blogs.length === 0 && <Loading />}
    </div>
  );
}
