import React, { useEffect, useState } from "react";
import homeIcon from "../../../icons/Home.svg";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../Firebase/FireStore";
import PaginationProduct from "./PaginationProduct";
import Loading from "../../../Sections/Loading";
import { useLocation } from "react-router-dom";

export default function Shop() {
  let [cateData, setCateData] = useState([]);
  let [productData, setProductData] = useState([]);
  let [filteredProductData, setFilteredProductData] = useState([]);
  let [filterWord, setFilterWord] = useState("");
  let [isLoading, setIsLoading] = useState(false);
  let [filterIsShown, setFilterIsShown] = useState(false);
  let [nowCategory, setNowCategory] = useState("");
  let location = useLocation();

  let [filterObject, setFilterObject] = useState({
    price: 20000,
    rate: 4,
    category: location.state?.category || "all",
    color: "all",
  });
  let color = [
    "red",
    "yellow",
    "blue",
    "green",
    "brown",
    "beige",
    "black",
    "gray",
  ];

  function getTop() {
    scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  //get data
  async function getCateData() {
    let data = [];
    let querySnapshot = await getDocs(collection(db, "category"));
    querySnapshot.forEach((doc) => {
      data = [...data, doc.data()];
    });
    setCateData(data);
    console.log;
    if (location.state) {
      setNowCategory(location.state.category);
    }
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
    getCateData();
    getProductData();
    getTop();
  }, [filterObject, filterWord]);

  //add rate
  function addRate() {
    let data = productData;
    if (data.length) {
      data.map((item, i) => {
        let rate = 0;
        if (item.reviews.length) {
          item.reviews.map((review) => {
            rate = review.rate + rate;
          });
          rate = rate / item.reviews.length;
        }
        data[i] = { ...item, rate: rate };
      });
    }
    setFilteredProductData(data);
    console.log(filteredProductData);
  }

  useEffect(() => {
    addRate();
  }, [productData]);

  //filter data
  function getFilteredWord(e) {
    let word = filterWord;
    word = e.target.value;
    setFilterWord(word);
    console.log(filterWord);
  }

  function getFilteredObject(e) {
    let object = filterObject;
    object[e.target.name] = e.target.value;
    setFilterObject(object);
    setIsLoading(true);
  }

  function filterData() {
    setIsLoading(false);
    let data = filteredProductData;
    if (filterWord) {
      return data.filter((item) =>
        item.name.toLowerCase().includes(filterWord.toLowerCase())
      );
    } else {
      if (filterObject.color === "all" && filterObject.category !== "all") {
        return data
          .filter(
            (item) =>
              item.price - (item.price * item.discount) / 100 <=
              filterObject.price
          )
          .filter((item) => item.rate <= filterObject.rate)
          .filter((item) => item.cate === filterObject.category);
      } else if (
        filterObject.color !== "all" &&
        filterObject.category === "all"
      ) {
        return data
          .filter(
            (item) =>
              item.price - (item.price * item.discount) / 100 <=
              filterObject.price
          )
          .filter((item) => item.rate <= filterObject.rate)
          .filter((item) => item.color === filterObject.color);
      } else if (
        filterObject.color === "all" &&
        filterObject.category === "all"
      ) {
        return data
          .filter(
            (item) =>
              item.price - (item.price * item.discount) / 100 <=
              filterObject.price
          )
          .filter((item) => item.rate <= filterObject.rate);
      } else if (
        filterObject.color !== "all" &&
        filterObject.category !== "all"
      ) {
        return data
          .filter(
            (item) =>
              item.price - (item.price * item.discount) / 100 <=
              filterObject.price
          )
          .filter((item) => item.rate <= filterObject.rate)
          .filter((item) => item.cate === filterObject.category)
          .filter((item) => item.color === filterObject.color);
      }
    }
  }

  return (
    <>
      <div className="w-full relative">
        <div className="w-full h-[28rem] bg-[url('/src/imgs/Assets/backgroundShop.webp')] bg-fixed bg-center xl:bg-top cover bg-conte xl:bg-contain bg-no-repeat overflow-hidden relative">
          <div className="h-full bg-black/40 flex justify-center items-center text-white ">
            <div className="flex flex-col items-center gap-8">
              <p className="text-4xl font-bold ">Shop</p>

              <div className="flex gap-1 text-lg">
                <div className="flex gap-1">
                  <img src={homeIcon} alt="  " className="w-4" />

                  <span className="">Home</span>
                </div>

                <span>/ Shop</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center lg:w-1/2 m-auto p-8">
          <p className="text-2xl font-bold p-3 text-[#133a5e]">
            Make your dream home true
          </p>

          <p className="leading-loose lg:text-lg">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod ab
            adipisci, culpa veritatis unde at explicabo itaque minima iste
            quidem quibusdam repellendus voluptatum consequuntur a corporis
            suscipit dolorum? Obcaecati, ab. Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Distinctio expedita aliquid provident
            explicabo corporis? Doloribus tempora distinctio magni recusandae
            esse, qui illo quibusdam, assumenda veritatis dolor excepturi dolore
            deserunt impedit!
          </p>
        </div>

        <div className="flex justify-center font-semibold md:hidden p-8 ">
          <button
            onClick={() => setFilterIsShown(true)}
            className="bg-pramiry text-white hover:bg-secondary hover:text-pramiry transition p-3 px-5 rounded-xl "
          >
            Show Filter
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-[90%] m-auto pb-6">
          {productData.length && (
            <div className="bg-white shadow-2xl rounded-xl h-fit hidden lg:col-span-1 md:flex flex-col items-between p-4 ">
              <div className="w-[90%] m-auto flex flex-col h-full  gap-4 py-8 ">
                <div className="">
                  <input
                    type="text"
                    onChange={(e) => getFilteredWord(e)}
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                  />
                </div>

                <p>Filter By</p>

                <div>
                  <p>price (between 5000 and 30000)</p>
                  <input
                    type="range"
                    min={5000}
                    max="30000"
                    defaultValue="20000"
                    className="range range-accent "
                    step="5000"
                    name="price"
                    onChange={(e) => getFilteredObject(e)}
                  />

                  <div className="w-full flex justify-between text-xs px-2">
                    <span>5000</span>
                    <span>10000</span>
                    <span>15000</span>
                    <span>20000</span>
                    <span>25000</span>
                    <span>30000</span>
                  </div>
                </div>

                <div>
                  <p>Rate (between 1 and 5)</p>
                  <input
                    type="range"
                    min={1}
                    max="5"
                    defaultValue="4"
                    // value="30000"
                    className="range range-accent"
                    step="1"
                    name="rate"
                    onChange={(e) => getFilteredObject(e)}
                  />

                  <div className="w-full flex justify-between text-xs px-2">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                  </div>
                </div>

                <div>
                  <p className="p-2">Category</p>
                  <select
                    className="select select-bordered w-full max-w-xs"
                    defaultValue={nowCategory}
                    name="category"
                    onChange={(e) => getFilteredObject(e)}
                  >
                    <option name="all" value="all" selected>
                      all
                    </option>

                    {cateData.length
                      ? cateData.map((item, i) => (
                          <option key={i} name={item.name} value={item.name}>
                            {item.name}
                          </option>
                        ))
                      : ""}
                  </select>
                </div>

                <div>
                  <p className="p-2">Color</p>
                  <select
                    className="select select-bordered w-full max-w-xs"
                    defaultValue="all"
                    name="color"
                    onChange={(e) => getFilteredObject(e)}
                  >
                    <option name="all" value="all" selected>
                      all
                    </option>

                    {color.map((item, i) => (
                      <option name={item} key={i} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
          <div className="col-span-1 lg:col-span-2 xl:col-span-3 ">
            {productData.length !== 0 && (
              <PaginationProduct
                filteredProductData={filteredProductData}
                filterData={filterData}
              />
            )}
          </div>
        </div>

        {filterIsShown && (
          <div className="bg-black/50 transition fixed md:hidden z-50   h-screen w-full top-0 lg:col-span-1 flex flex-col items-between p-4 ">
            <div className="w-[90%] m-auto flex flex-col gap-4 p-8 h-3/4 rounded-xl bg-white ">
              <div className="">
                <input
                  type="text"
                  onChange={(e) => getFilteredWord(e)}
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>

              <p>Filter By</p>

              <div>
                <p>price (between 5000 and 30000)</p>
                <input
                  type="range"
                  min={5000}
                  max="30000"
                  defaultValue="20000"
                  // value="30000"
                  className="range range-accent"
                  step="5000"
                  name="price"
                  onChange={(e) => getFilteredObject(e)}
                />

                <div className="w-full flex justify-between text-xs px-2">
                  <span>5000</span>
                  <span>10000</span>
                  <span>15000</span>
                  <span>20000</span>
                  <span>25000</span>
                  <span>30000</span>
                </div>
              </div>

              <div>
                <p>Rate (between 1 and 5)</p>
                <input
                  type="range"
                  min={1}
                  max="5"
                  defaultValue="4"
                  // value="30000"
                  className="range range-accent"
                  step="1"
                  name="rate"
                  onChange={(e) => getFilteredObject(e)}
                />

                <div className="w-full flex justify-between text-xs px-2">
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                  <span>5</span>
                </div>
              </div>

              <div>
                <p className="p-2">Category</p>
                <select
                  className="select select-bordered w-full max-w-xs"
                  defaultValue={
                    location.state ? location.state.category : "all"
                  }
                  name="category"
                  onChange={(e) => getFilteredObject(e)}
                >
                  <option name="all" value="all" selected>
                    all
                  </option>

                  {cateData.length
                    ? cateData.map((item, i) => (
                        <option key={i} name={item.name} value={item.name}>
                          {item.name}
                        </option>
                      ))
                    : ""}
                </select>
              </div>

              <div>
                <p className="p-2">Color</p>
                <select
                  className="select select-bordered w-full max-w-xs"
                  defaultValue="all"
                  name="color"
                  onChange={(e) => getFilteredObject(e)}
                >
                  <option name="all" value="all" selected>
                    all
                  </option>

                  {color.map((item, i) => (
                    <option name={item} key={i} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full flex justify-center p-5">
                <button
                  onClick={() => setFilterIsShown(false)}
                  className="font-semibold p-3 px-10 bg-pramiry rounded-xl text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {!productData.length && <Loading />}
      </div>
    </>
  );
}
