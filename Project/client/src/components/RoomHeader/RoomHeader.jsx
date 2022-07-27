import React from 'react'
import './RoomHeader.css'

const RoomHeader = ({ id }) => {
    return (
        <div className="roomContainer">
            <div className="menu">
                <span className="roomInfo">
                    Room Name
                    <span className="innerInfo">
                        King Room
                    </span>
                </span>
                <span className="roomInfo">
                    Cost per Night
                    <span className="innerInfo">
                        124 $
                    </span>
                </span>
                <span className="roomInfo">
                    Size
                    <span className="innerInfo">
                        3
                    </span>
                </span>
                <button className="roomButton">Book Now</button>
            </div>
        </div>
    )
}

export default RoomHeader