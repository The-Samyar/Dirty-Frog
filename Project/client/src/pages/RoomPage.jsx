import React from 'react'
import Footer from '../components/Footer/Footer'
import { useParams } from 'react-router-dom'
import RoomHeader from '../components/RoomHeader/RoomHeader'
import RoomSummary from '../components/RoomSummary/RoomSummary'
import RoomDetails from '../components/RoomDetails/RoomDetails'

const RoomPage = () => {

  let {id} = useParams()
  console.log(id);
  return (
    <div>
      <RoomHeader id={id} />
      <RoomSummary />
      <RoomDetails />
      <Footer />
    </div>
  )
}

export default RoomPage