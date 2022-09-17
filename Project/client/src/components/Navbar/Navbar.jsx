import React /* { useEffect , useContext } */ from 'react'
import './Navbar.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { VscThreeBars } from 'react-icons/vsc'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AiOutlineHome } from 'react-icons/ai'
import { MdOutlineBedroomChild } from 'react-icons/md'
import { RiHotelLine, RiContactsLine } from 'react-icons/ri'
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
/* import { AuthContext } from '../../context' */

const Navbar = ({ covered }) => {

  const [visibility, setVisibility] = useState(false);
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('access'));
  console.log(token)

  const checkScroll = () => {
    if (window.scrollY >= 500 && !visibility) {
      setVisibility(true);
    } else if (window.scrollY < 500 && visibility) {
      setVisibility(false);
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ behavior: 'smooth', top: 0 });
  }

  window.addEventListener('scroll', checkScroll);


  return (
    <>
      <nav className="navigation" style={{ backgroundColor: covered ? 'rgba(27, 27, 48, 0.9)' : null }}>

        <VscThreeBars onClick={() => { setOpen(!open); console.log(open) }} className="menuIcon" />
        <div className={open ? "containerNav2" : "containerNav"}>
          <ul className="navItems">
            <li className="navItem">
              <Link to="/" className="navItemLinks">
                <AiOutlineHome className="navIcon" />
                Home
              </Link>
            </li>
            <li className="navItem">
              <Link to="/rooms" className="navItemLinks">
                <MdOutlineBedroomChild className="navIcon" />
                Rooms
              </Link>
            </li>
            <li className="navItem">
              <Link to="/aboutUs" className="navItemLinks">
                <RiHotelLine className="navIcon" />
                About Us
              </Link>
            </li>
            <li className="navItem">
              <Link to="/contactUs" className="navItemLinks">
                <RiContactsLine className="navIcon" />
                Contact Us
              </Link>
            </li>
            <li className="navItem">
              <Link to="/bookNow" className="navItemLinks special">Book Now</Link>
            </li>
            {
              token ? 
              
              <>
                      <li className = "navItem">
                        <Link to = "/logout" className = "navItemLinks">Log Out</Link>
                      </li>
                      <li className="navItem">
                        <Link to="/profile" className="navItemLinks">Profile</Link>
                      </li>
              </>
                :
                  <>
                      <li className = "navItem">
                        <Link to = "/signIn" className = "navItemLinks">Sign In</Link>
                      </li>
                      <li className="navItem">
                        <Link to="/signUp" className="navItemLinks">Sign Up</Link>
                      </li>
                  </>
            }
    </ul>
        </div >

      </nav >
  <FontAwesomeIcon icon={faArrowUp} className="toTopIcon" onClick={scrollToTop} style={{ display: visibility ? 'block' : 'none' }} />
    </>


  )
}

export default Navbar