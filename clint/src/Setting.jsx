import React, { useState, useEffect } from "react";
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
    <div>
      Setting
      <div>{name}</div>
      <div>
        <input value={value} onChange={handleChange} type="txt"></input>
        <button onClick={handlesummitChange}>change</button>
      </div>
    </div>
  );
};

export default Setting;
