import React from 'react'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'
import { useParams } from 'react-router-dom'
import RoomHeader from '../components/RoomHeader/RoomHeader'
import RoomSummary from '../components/RoomSummary/RoomSummary'

const RoomPage = () => {

  let {id} = useParams()
  console.log(id);
  return (
    <div>
      <Navbar covered />
      <RoomHeader id={id} />
      <RoomSummary />
      <Footer />
    </div>
  )
}

export default RoomPage