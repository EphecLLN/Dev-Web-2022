import React from "react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  // NavBtn,
  // NavBtnLink,
} from "./NavBar elements";

const Navbar = () => {
  return (
    <>
      <nav className="nav">
        <Bars />

        <div className="nav-center">
          <NavLink to="/" activeStyle>
            Home
          </NavLink>
          <NavLink to="/about" activeStyle>
            About
          </NavLink>
          <NavLink to="/creation" activeStyle>
            création
          </NavLink>
          <NavLink to="/play" activeStyle>
            play
          </NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
