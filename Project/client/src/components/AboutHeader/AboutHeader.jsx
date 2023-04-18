import React from 'react'
import './AboutHeader.css'
import Navbar from '../Navbar/Navbar'

const AboutHeader = () => {
  return (
    <div className="AboutHeaderContainer">
        <Navbar />
        <div>
            <h1>About Us</h1>
            <span className="aboutHeaderDesc">Everything you have to know about our hotel</span>
        </div>
    </div>
  )
}

export default AboutHeader