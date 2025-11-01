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
      Setting
      <div>{name}</div>
      <div>
        <input
          className="bg-stone-500"
          value={value}
          onChange={handleChange}
          type="txt"
        ></input>
        <button
          className="bg-stone-800 text-white"
          onClick={handlesummitChange}
        >
          change
        </button>
      </div>
    </div>
  );
};

export default Setting;
