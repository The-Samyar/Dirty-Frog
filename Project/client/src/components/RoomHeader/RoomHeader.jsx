import React from 'react'
import './RoomHeader.css'
import Navbar from '../Navbar/Navbar'

const RoomHeader = ({ name , cost , capacity }) => {
    return (
        <div className="roomContainer">
            <Navbar />
            <div className="menu">
                <span className="roomInfo">
                    Room Name
                    <span className="innerInfo">
                        {name}
                    </span>
                </span>
                <span className="roomInfo">
                    Cost per Night
                    <span className="innerInfo">
                        {cost} $
                    </span>
                </span>
                <span className="roomInfo">
                    Capacity
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