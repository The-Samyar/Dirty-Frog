import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {

  const [nav, setNav] = useState(false);

  const setBackground = () => {
    if (window.screenY >= 80) {
      setNav(true);
    }
  }

  useEffect(() => {
    console.log(window.screenY)
  }, [nav])

  window.addEventListener('scroll', setBackground);

  return (
    <header className="headerContainer">
      <nav className={`navigation ${nav ? 'active' : ''}`}>
        <ul className="navItems">
          <li className="navItem">
            <Link to="/" className="navItemLinks">Home</Link>
          </li>
          <li className="navItem">
            <Link to="/rooms" className="navItemLinks">Rooms</Link>
          </li>
          <li className="navItem">
            <Link to="/aboutUs" className="navItemLinks">About Us</Link>
          </li>
          <li className="navItem">
            <Link to="/contactUs" className="navItemLinks">Contact Us</Link>
          </li>
          <li className="navItem">
            <Link to="/bookNow" className="navItemLinks special">Books Now</Link>
          </li>
          <li className="navItem">
            <Link to="/signIn" className="navItemLinks">Sign In</Link>
          </li>
          <li className="navItem">
            <Link to="/signUp" className="navItemLinks">Sign Up</Link>
          </li>
        </ul>
      </nav>

      <div className="headerContent">
        <span>Hotel & resort</span>
        <h1>WELCOME TO OUR HOTEL</h1>
      </div>


    </header>
  )
}

export default Header