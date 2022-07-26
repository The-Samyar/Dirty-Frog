import React from 'react'
import GridAlbum from '../components/GridAlbum/GridAlbum'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'

const Rooms = () => {
  return (
    <div>
        <Navbar covered />
        <GridAlbum />
        <Footer />
    </div>
  )
}

export default Rooms