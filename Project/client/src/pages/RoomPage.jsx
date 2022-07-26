import React from 'react'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'
import Room from '../components/Room/Room'
import { useParams } from 'react-router-dom'

const RoomPage = () => {

  let {id} = useParams()
  console.log(id);
  return (
    <div>
      <Navbar covered />
      <Room id={id} />
      <Footer />
    </div>
  )
}

export default RoomPage