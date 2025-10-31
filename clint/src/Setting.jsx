import React, { useState, useEffect } from "react";
const Setting = () => {
  const [name, setName] = useState(null);

  useEffect(() => {
    setName(localStorage.getItem("name"));
  });

  return (
    <div>
      Setting
      <div>{name}</div>
      <div>
        <input type="txt"></input>
        <button>change</button>
      </div>
    </div>
  );
};

export default Setting;
