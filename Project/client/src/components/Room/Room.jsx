import React from 'react'
import './Room.css'

const Room = ({ id }) => {
    return (
        <div className="roomContainer">
            Room {id}
        </div>
    )
}

export default Room