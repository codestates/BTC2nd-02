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
          <span>
            <Link to="/" style={{ textDecoration: "none" }} className="title">
              KLAET
            </Link>
          </span>
          <span>
            <Link to="/tx" style={{ textDecoration: "none" }} className="menu">
              TxHash
            </Link>
          </span>
          <span>
            <Link
              to="/account"
              style={{ textDecoration: "none" }}
              className="menu"
            >
              Account Address
            </Link>
          </span>
        </span>
      </div>
    </div>
  );
}
export default Nav;
