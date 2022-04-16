import React from "react"
import { NavLink, Bars } from "./NavBar elements"

const Navbar = () => {
  return (
    <>
      <nav className="nav">
        <Bars />

        <div className="nav-center">
          <NavLink to="/">
            Home
          </NavLink>
          <NavLink to="/about">
            About
          </NavLink>
          <NavLink to="/creation">
            création
          </NavLink>
          <NavLink to="/play">
            play
          </NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </div>
      </nav>
    </>
  )
}

export default Navbar
