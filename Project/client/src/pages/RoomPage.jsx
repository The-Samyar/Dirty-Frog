import React, { useState, useEffect, Suspense } from 'react'
import { useParams } from 'react-router-dom'
import { getRoomDetails } from '../api/api'
import RoomHeader from '../components/RoomHeader/RoomHeader'
import RoomSummary from '../components/RoomSummary/RoomSummary'
const RoomDetails = React.lazy(() => import('../components/RoomDetails/RoomDetails'))
const Footer = React.lazy(() => import('../components/Footer/Footer'))

const RoomPage = () => {

  const [Room, setRoom] = useState(null)
  let { name } = useParams()

  useEffect(() => {
    const getRoom = async () => {
      const { data } = await getRoomDetails(name);
      console.log(data)
      setRoom(data)
    }

    getRoom();
  }, [name])




  return (
    Room && <div>
      <RoomHeader name={Room.room_name} cost={Room.cost_per_day} capacity={Room.capacity} />
      <RoomSummary services={Room.services} />
      <Suspense fallback={<div>Loading ...</div>}>
        <RoomDetails description={Room.description} />
      </Suspense>
      <Suspense fallback={<div>Loading ...</div>}>
        <Footer />
      </Suspense>
    </div>
  )
}

export default RoomPage