import React from 'react'
import {AiOutlineWifi} from 'react-icons/ai'
import {IoBedOutline , IoRestaurantOutline} from 'react-icons/io5'
import {MdOutlineRoomService} from 'react-icons/md'
import {CgSmartHomeWashMachine} from 'react-icons/cg'
import {BsPeople} from 'react-icons/bs'
import './RoomSummary.css'

const RoomSummary = () => {
  return (
    <section className="RoomSummaryContainer">
        <h4 className="titleRoomInfo">
            Room Aminities
        </h4>

        <div className="aminitiesContainer">
            <div className="aminitesItem">
                <AiOutlineWifi className="icons"/>
                Free Wifi
            </div>
            <div className="aminitesItem">
                <BsPeople className="icons" />
                2 people
            </div>
            <div className="aminitesItem">
                <CgSmartHomeWashMachine className="icons"/>
                Washing Machine
            </div>
            <div className="aminitesItem">
                <IoBedOutline className="icons" />
                King size bed
            </div>
            <div className="aminitesItem">
                <MdOutlineRoomService className="icons" />
                Room Services
            </div>
            <div className="aminitesItem">
                <IoRestaurantOutline className="icons" />
                Food order service
            </div>
        </div>
    </section>
  )
}

export default RoomSummary