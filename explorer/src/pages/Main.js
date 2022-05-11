import React from "react";
import { BsSearch } from "react-icons/bs";
import "../App.css";

export default function Main() {
  const click = () => {
    alert("button test");
  };
  return (
    <div>
      <div className="searchbar">
        <input type="text"></input>
        <BsSearch
          size="15"
          className="searchicon"
          type="button"
          onClick={click}
        />
      </div>
    </div>
  );
}
