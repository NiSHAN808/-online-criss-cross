import React, { useState, useEffect } from "react";
import Navbar from "./block/Navbarstyle";
const Setting = () => {
  const [name, setName] = useState(null);
  const [value, setValue] = useState("");

  useEffect(() => {
    setName(localStorage.getItem("name"));
  });

  const handleChange = (e) => {
    setValue(e.target.value); // update state with input value
  };

  const handlesummitChange = () => {
    localStorage.setItem("name", value);
    setName(value);
  };
  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-green-700 to-yellow-400">
      <Navbar />
      <div className=" w-[100vw] inline-flex  justify-center border-2">
        <div className=" h-[50vw] w-[85vw] ">
          <h3 className="text-[2rem] w-full inline-flex justify-center mt-[5vw]">
            {" "}
            Setting
          </h3>
          <div className="w-full inline-flex justify-center mt-15">{name}</div>
          <div>
            <div className="inline-flex w-full justify-center mt-[5vw]">
              <div className="inline-flex bg-green-400 rounded-md w-content">
                <input
                  className=""
                  value={value}
                  onChange={handleChange}
                  type="txt"
                ></input>
                <button
                  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 m-1 mt-1.5 mb-1.5   dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  onClick={handlesummitChange}
                >
                  change
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
