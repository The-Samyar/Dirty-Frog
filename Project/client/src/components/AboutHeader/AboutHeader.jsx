import React from 'react'
import './AboutHeader.css'
import Navbar from '../Navbar/Navbar'

const AboutHeader = () => {
  return (
    <div className="AboutHeaderContainer">
        <Navbar />
        <div>
            <h1>About Us</h1>
            <span>Everything you have to know about our hotel</span>
        </div>
    </div>
  )
}

export default AboutHeader