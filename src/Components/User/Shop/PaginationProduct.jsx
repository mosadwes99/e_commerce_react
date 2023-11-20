import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";

export default function PaginationProduct(props) {
  let { filterData } = props;
  let [paginationNumber, setPaginationNumber] = useState([]);
  let [pageNumber, setPageNumber] = useState(1);
  let pageSize = 9;
  let [pagination, setPagination] = useState({
    from: 0,
    to: 9,
  });

  let cookie = new Cookies();
  let navigate = useNavigate();

  useEffect(() => {
    let totalItems = filterData().length;
    let totalPages = Math.ceil(totalItems / pageSize);
    let pagesArray = Array.from(
      { length: totalPages },
      (_, index) => index + 1
    );

    setPaginationNumber(pagesArray);
  }, [filterData]);

  function handdlePagination(e) {
    setPageNumber(e);
    let f = (e - 1) * pageSize;
    let t = (e - 1) * pageSize + pageSize;
    setPagination({
      ...pagination,
      from: f,
      to: t,
    });
  }

  function pageNumberStyle(e) {
    return e === pageNumber ? "bg-pramiry text-white" : "bg-white text-pramiry";
  }

  function paginationData() {
    return filterData().slice(pagination.from, pagination.to);
  }

  function calculateDiscount(e) {
    if (e.discount !== 0) {
      return e.price - (e.price * e.discount) / 100;
    } else {
      return e.price;
    }
  }

  function handdleCart(e) {
    if (cookie.get("currentUser")) {
      console.log("login");
    } else {
      navigate("/login");
    }
  }

  return (
    <>
      <div className="grid 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 2xl:rows-3 xl:rows-5 md:rows-9 gap-3 gap-y-20">
        {paginationData().length ? (
          paginationData().map((item, i) => (
            <div
              key={i}
              className={`rounded-xl relative h-[22rem] col-span-1 row-span-1`}
            >
              <div
                className={`rounded-xl relative h-[22rem] col-span-1 row-span-1`}
              >
                <div className="overflow-hidden rounded-xl w-full h-full">
                  <Link to={`/productdetails/${item.uid}`}>
                    <img
                      src={item.imgUrl}
                      className="w-full h-full -z-10 rounded-xl overflow-hidden hover:scale-125 transition duration-500"
                      alt=""
                    />
                  </Link>
                </div>

                <div className="w-[90%] lg:h-2/6  rounded-xl z-10 absolute flex flex-col justify-between  shadow-lg  -bottom-12 left-1/2 -translate-x-1/2 bg-white p-3 ">
                  <div>
                    <p className="text-md text-start font-semibold w-full truncate">
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
            </div>
          ))
        ) : (
          <div className="text-center lg:text-start p-4 text-pramiry text-3xl font-bold">
            No Products Match
          </div>
        )}
      </div>

      {paginationNumber.length !== 0 && (
        <div className="flex justify-center gap-2 p-20">
          {paginationNumber.map((item, i) => (
            <div
              key={i}
              onClick={() => handdlePagination(item)}
              className={`${pageNumberStyle(
                item
              )} w-12 h-12 font-semibold hover:ring-0 hover:text-white ring-2  ring-pramiry text-center rounded-full leading-[3rem] transition duration-200 cursor-pointer hover:bg-secondary`}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
