import React from 'react'
import Navbar from '../Navbar/Navbar'
import './Header.css'

const Header = () => {

  return (
    <header className="headerContainer">
      <Navbar />
      <div className="headerContent">
        <span>Hotel & resort</span>
        <h1>WELCOME TO OUR HOTEL</h1>
      </div>


    </header>
  )
}

export default Header