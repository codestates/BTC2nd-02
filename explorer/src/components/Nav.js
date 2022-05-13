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
          <span className="title">
            <Link to="/" style={{ textDecoration: "none" }}>
              KLAET
            </Link>
          </span>
        </span>
      </div>
      <hr />
    </div>
  );
}
export default Nav;
