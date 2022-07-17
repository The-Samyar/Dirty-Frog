import React from 'react'
import Navbar from '../Navbar/Navbar'
import './ContactHeader.css'

const ContactHeader = () => {
  return (
    <div className="ContactHeaderContainer">
        <Navbar />
        <div>
            <h1>Contact Us</h1>
            <span>Everything you need to contact with us.</span>
        </div>
    </div>
  )
}

export default ContactHeader