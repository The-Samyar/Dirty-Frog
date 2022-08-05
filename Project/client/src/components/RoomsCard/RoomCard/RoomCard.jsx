import React from 'react'
import {MdOutlineRoomService} from 'react-icons/md'
import {GiConfirmed} from 'react-icons/gi'
import './RoomCard.css'

const RoomCard = () => {
    return (
        <div className="RoomCardContainer">
            <div className="innerRoomCard">
                <h4 className="RoomCardTitle">Medium King</h4>
            </div>

            <div className="roomCardInfo">
                <GiConfirmed  className="roomCardIcon"/> Your room will be ready for check-in at 14:00
            </div>
            <div className="roomCardInfo">
                <MdOutlineRoomService  className="roomCardIcon"/> 24-hour front desk – Help whenever you need it!
            </div>

            <div className="roomServices">
                <div className="roomServiceItem">
                    <MdOutlineRoomService className="roomServiceIcon" /> Room Service
                </div>
                <div className="roomServiceItem">
                    <MdOutlineRoomService className="roomServiceIcon" /> Room Service
                </div>
                <div className="roomServiceItem">
                    <MdOutlineRoomService className="roomServiceIcon" /> Room Service
                </div>
                <div className="roomServiceItem">
                    <MdOutlineRoomService className="roomServiceIcon" /> Room Service
                </div>
                <div className="roomServiceItem">
                    <MdOutlineRoomService className="roomServiceIcon" /> Room Service
                </div>
                <div className="roomServiceItem">
                    <MdOutlineRoomService className="roomServiceIcon" /> Room Service
                </div>
            </div>

            <div className="guestsNumber">
                <h4 className="guestTitle">Number of guests:</h4>
                <span>2</span>
            </div>

            <div className="guestsNumber">
                <h4 className="guestTitle">Full guest name: </h4>
                <span>John Doe</span>
            </div>
        </div>
    )
}

export default RoomCard