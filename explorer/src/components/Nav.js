import { Link } from "react-router-dom";
import React from "react";
import { AiTwotoneCompass } from "react-icons/ai";
import KLAETLogo from "./img/KLAETLogo.png";
import { BsSearch } from "react-icons/bs";

function Nav() {
  return (
    <div>
      <div className="Nav">
        <span className="Logo">
          <img className="logo" src={KLAETLogo} alt="logo"></img>
          <span className="title">
            <Link to="/" style={{ textDecoration: "none" }}>
              KLAET
            </Link>
          </span>
        </span>

        <span className="menu">
          <Link to="/block" style={{ textDecoration: "none" }}>
            <span className="text">BLOCKS</span>
          </Link>
        </span>
        <span className="menu">
          <Link to="/tx" style={{ textDecoration: "none" }}>
            <span className="text">TRANSACTION</span>
          </Link>
        </span>
      </div>
      <hr />
    </div>
  );
}
export default Nav;
