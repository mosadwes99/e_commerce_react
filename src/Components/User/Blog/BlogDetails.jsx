import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../Firebase/FireStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import Loading from "../../../Sections/Loading";

export default function BlogDetails() {
  let { uid } = useParams();
  let [blog, setBlog] = useState([]);

  async function getBlogsData() {
    let data = [];
    let q = query(collection(db, "Blogs"), where("uid", "==", uid));
    let querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      data = [...data, doc.data()];
    });
    setBlog(data[0]);
    console.log(blog);
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
    <div className="relative w-full">
      <div className="h-16 bg-pramiry fixed top-0 z-10 start-0 w-full"></div>
      <div className="h-16 bg-pramiry w-full"></div>
      {blog.length !== 0 ? (
        <div className="lg:w-4/5 p-10 mx-auto text-center">
          <p className="text-3xl text-pramiry  font-bold">{blog.title}</p>

          <p className="text-black/60 text-xl  mb-6">{blog.date}</p>

          <img
            src={blog.imgUrl}
            className="rounded-xl lg:h-[60vh] border w-full object-cover "
            alt="img"
          />

          <p className="text-start py-2 lg:p-6">{blog.desc}</p>
        </div>
      ) : (
        <div className="min-h-[50rem]"></div>
      )}
      {blog.length === 0 && <Loading />}
    </div>
  );
}
