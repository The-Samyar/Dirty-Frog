import React from 'react'
import './Navbar.css'
import {useState} from 'react'
import {Link} from 'react-router-dom'

const Navbar = ({covered}) => {

    const [nav, setNav] = useState(false)

    const setBackground = () => {
        if (window.screenY >= 80) {
          setNav(true);
        }
      }
    
      window.addEventListener('scroll', setBackground);


  return (
    <nav className="navigation" style={{backgroundColor : covered ? 'rgba(27, 27, 48, 0.9)' : null}}>
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
  )
}

export default Navbar