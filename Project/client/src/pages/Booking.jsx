import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import BookingDetail from '../components/BookingDetail/BookingDetail'
import RoomsCard from '../components/RoomsCard/RoomsCard'
import BookingSummary from '../components/BookingSummary/BookingSummary'

const Booking = () => {
  return (
    <div>
        <Navbar covered />
        <BookingDetail />
        <RoomsCard />
        <BookingSummary />
        <Footer />
    </div>
  )
}

export default Booking