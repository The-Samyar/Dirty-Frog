import React from 'react'
import { useState , useEffect } from 'react'
import './Header.css'

const Header = () => {

  const [nav , setNav] = useState(false);
  
  const setBackground = () => {
    if (window.screenY >= 80) {
      setNav(true);
    }
  }

  useEffect(() =>
    console.log(window.screenY)
  , [nav])

  window.addEventListener('scroll', setBackground);

  return (
    <header className="headerContainer">
      <nav className={`navigation ${nav ? 'active' : ''}`}>
        <ul className="navItems">
          <li className="navItem">Home</li>
          <li className="navItem">Rooms</li>
          <li className="navItem">About Us</li>
          <li className="navItem">Contact</li>
          <li className="navItem special">Book Now</li>
          <li className="navItem">Sign Up</li>
          <li className="navItem">Sign In</li>
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