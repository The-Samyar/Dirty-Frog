import React, { useRef } from 'react'
import './Navbar.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ covered }) => {

  const [visibility, setVisibility] = useState(false);
  const [responsive, setResponsive] = useState(false);
  const [open, setOpen] = useState('0%');
  const ref = useRef();
  const checkScroll = () => {
    if (window.scrollY >= 500 && !visibility) {
      setVisibility(true);
    } else if (window.scrollY < 500 && visibility) {
      setVisibility(false);
    }
  }

  const checkWidth = () => {
    if (window.innerWidth <= 700 && !responsive) {
      setResponsive(true)
    } else if (window.innerWidth > 700 && responsive) {
      setResponsive(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ behavior: 'smooth', top: 0 });
  }

  window.addEventListener('scroll', checkScroll);
  window.addEventListener('onpageshow', checkWidth);
  window.addEventListener('resize', checkWidth);

  console.log(responsive)


  return (
    <>
      <nav className="navigation" style={{ backgroundColor: covered ? 'rgba(27, 27, 48, 0.9)' : null }}>
        {!responsive ?
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
              <Link to="/bookNow" className="navItemLinks special">Book Now</Link>
            </li>
            <li className="navItem">
              <Link to="/signIn" className="navItemLinks">Sign In</Link>
            </li>
            <li className="navItem">
              <Link to="/signUp" className="navItemLinks">Sign Up</Link>
            </li>
          </ul> :

          <div className="responsive" onClick={() => ref.current.style.width === '0%' ? ref.current.style.width = '400%' : ref.current.style.width = '0%'}>
            hello
            <div className="containerNav" ref={ref}>
              <ul className="navItemsResponsive">
                <li className="navItemsResponsive">
                  <Link to="/" className="navItemLinks">Home</Link>
                </li>
                <li className="navItemsResponsive">
                  <Link to="/rooms" className="navItemLinks">Rooms</Link>
                </li>
                <li className="navItemsResponsive">
                  <Link to="/aboutUs" className="navItemLinks">About Us</Link>
                </li>
                <li className="navItemsResponsive">
                  <Link to="/contactUs" className="navItemLinks">Contact Us</Link>
                </li>
                <li className="navItemsResponsive">
                  <Link to="/bookNow" className="navItemLinks specialResponsive">Book Now</Link>
                </li>
                <li className="navItemsResponsive">
                  <Link to="/signIn" className="navItemLinks">Sign In</Link>
                </li>
                <li className="navItemsResponsive">
                  <Link to="/signUp" className="navItemLinks">Sign Up</Link>
                </li>
              </ul>
            </div>
          </div>
        }
      </nav>
      <FontAwesomeIcon icon={faArrowUp} className="toTopIcon" onClick={scrollToTop} style={{ display: visibility ? 'block' : 'none' }} />
    </>


  )
}

export default Navbar