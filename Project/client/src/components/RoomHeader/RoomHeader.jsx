import React from 'react'
import './RoomHeader.css'
import Navbar from '../Navbar/Navbar'

const RoomHeader = ({ name , cost , capacity }) => {
    return (
        <div className="roomContainer">
            <Navbar />
            <div className="menu">
                <span className="roomInfo">
                    <span className="roomInfoTitle">Room Name</span>
                    <span className="innerInfo">
                        {name}
                    </span>
                </span>
                <span className="roomInfo">
                <span className="roomInfoTitle">Cost Per Night</span>
                    <span className="innerInfo">
                        {cost} $
                    </span>
                </span>
                <span className="roomInfo">
                    <span className="roomInfoTitle">Capacity</span>
                    <span className="innerInfo">
                        {capacity}
                    </span>
                </span>
                <button className="roomButton">Book Now</button>
            </div>
        </div>
    )
}

export default RoomHeader