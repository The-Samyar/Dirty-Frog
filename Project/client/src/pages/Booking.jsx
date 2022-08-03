import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import BookingDetail from '../components/BookingDetail/BookingDetail'

const Booking = () => {
  return (
    <div>
        <Navbar covered />
        <BookingDetail />
        <Footer />
    </div>
  )
}

export default Booking