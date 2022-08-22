import React from 'react'
import { Icon } from '../../Table/Table'
import { MdOutlineRoomService } from 'react-icons/md'
import { GiConfirmed } from 'react-icons/gi'
import './RoomCard.css'

const RoomCard = ({ room , guest }) => {
    return (
        <div className="RoomCardContainer">
            <div className="innerRoomCard">
                <h4 className="RoomCardTitle">{room.room_name}</h4>
            </div>

            <div className="roomCardInfo">
                <GiConfirmed className="roomCardIcon" /> Your room will be ready for check-in at 14:00
            </div>
            <div className="roomCardInfo">
                <MdOutlineRoomService className="roomCardIcon" /> 24-hour front desk – Help whenever you need it!
            </div>

            <div className="roomServices">
                { 
                    room.services.map((service, index) => <span key={Object.values(service)[0]}>{
                        Object.keys(service).map(item => {
                            return (
                                <div className="roomServiceItem">
                                    <Icon item={Number(item)} />
                                    <span>{service[item]}</span>
                                </div>
                            )
                        })
                    }</span>)
                }

            </div>

            <div className="guestsNumber">
                <h4 className="guestTitle">Number of guests:</h4>
                <span>{guest}</span>
            </div>

            <div className="guestsNumber">
                <h4 className="guestTitle">Full guest name: </h4>
                <span>John Doe</span>
            </div>
        </div>
    )
}

export default RoomCard