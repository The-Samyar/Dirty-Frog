import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import Table from '../components/Table/Table'

const BookNow = () => {
  return (
    <div>
      <Navbar covered={true} />
      <Table />
      <Footer />
    </div>
  )
}

export default BookNow