import React from 'react'
import RoomCard from './RoomCard/RoomCard'
import './RoomsCard.css'

const RoomsCard = ({rooms}) => {
  return (
    <div className="RoomsCard">
      {
        rooms?.map(room => (
          <RoomCard room={room} key={room.roomName} />
        ))
      }
    </div>
  )
}

export default RoomsCard