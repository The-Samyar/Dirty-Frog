import React from 'react'
import RoomCard from './RoomCard/RoomCard'
import './RoomsCard.css'

const RoomsCard = ({rooms , guests}) => {
  return (
    <div className="RoomsCard">
      {
        rooms?.map(room => (
          <RoomCard room={room} key={room.room_name} guest={guests}/>
        ))
      }
    </div>
  )
}

export default RoomsCard