import React from 'react'
import { Icon } from '../Table/Table'
import './RoomSummary.css'

const RoomSummary = ({ services }) => {
    return (
        <section className="RoomSummaryContainer">
            <h4 className="titleRoomInfo">
                Room Aminities
            </h4>

            <div className="aminitiesContainer">
                {


                    services.map(service => (
                        <span>
                            {
                                Object.keys(service).map(item => (
                                    <div className="aminitesItem">
                                        <Icon item={Number(item)} className="icons" />
                                        {service[item]}
                                    </div>
                                ))
                            }
                        </span>
                    ))
                }
            </div>
        </section>
    )
}

export default RoomSummary