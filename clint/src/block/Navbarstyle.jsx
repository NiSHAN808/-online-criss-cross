import "./Navbarstyle.css";
import React, { useRef, useState } from "react";
import { Link } from "react-router";
function Navbar() {
  let pageStyle = useRef(0);
  const pages = useRef(0);

  function handleHamClick() {
    if (pageStyle.current === 0) {
      pages.current.style.display = "flex";
      pageStyle.current = 1;
    } else {
      pages.current.style.display = "none";
      pageStyle.current = 0;
    }
  }
  let link = "/";
  return (
    <div>
      <nav className="bg-transparent h-[10vw] lg:h-[7vh] flex justify-between items-center sticky top-0   ">
        <div className="logo">
          {/* website
                    logo-ecommerce
                       let link="/products/"+x+"/"+props.name+"/"+props.price+"/"+props.sold+"/"+props.category;
                        */}
          <Link
            to={link}
            className="inline-flex justify-center h-fit  inline w-[40vw] h-[10vw] overflow-hidden   p-[1vw]  "
          >
            <div
              className=" h-[8vw] lg:h-[3.5vw] xl:h-[2.5vw] 2xl:h-[1.8vw] text-[1.5rem] "
              style={{ fontFamily: "cursive", color: "rgb(182 255 182)" }}
            >
              {" "}
              Criss Corss
            </div>
          </Link>
        </div>

        <div
          onClick={handleHamClick}
          className="hidden hamburger z-200 mr-[5vw]"
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="white"
            strokeWidth="10"
            strokeLinecap="round"
          >
            <line x1="20" y1="30" x2="80" y2="30" />
            <line x1="20" y1="50" x2="80" y2="50" />
            <line x1="20" y1="70" x2="80" y2="70" />
          </svg>
        </div>
        <div ref={pages} className="pages w-[20vw] flex justify-around">
          <Link
            to="/Chat"
            className="hover:text-purple-700 md:text-[3.5vw]  lg:text-[2vw] xl:text-[1.9vw]"
            onClick={handleHamClick}
          >
            Chat
          </Link>
          <Link
            to="/profile"
            className="hover:text-purple-700 md:text-[3.5vw]  lg:text-[2vw] xl:text-[1.9vw]"
            onClick={handleHamClick}
          >
            Profile
          </Link>
          {/* <a className="hover:text-purple-700 ">home</a>
                    <a className="hover:text-purple-700 ">products</a>
                    <a className="hover:text-purple-700 ">cart</a> */}
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
