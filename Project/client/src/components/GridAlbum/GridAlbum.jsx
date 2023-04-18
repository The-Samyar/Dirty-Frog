import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getRoomsSummary } from '../../api/api'
import './GridAlbum.css'

const GridAlbum = () => {

    const [Rooms, setRooms] = useState(null);

    useEffect(() => {
        const getRooms = async () => {
            const { data } = await getRoomsSummary();
            setRooms(data);
        }

        getRooms();
    }, [])


    return (
        Rooms && <div className="albumContainer">
            <div className="albumGridContainer">
                {
                    Rooms.map((room, index) => (
                        <div className="item" id={`item${index+1}`} key={room.room_name}>
                            <span>{room.room_name}</span>
                            <div className="itemOverlay">
                                <div className="overlayBtn">
                                    <Link to={`/room/${room.room_name}/`} >Show Room</Link>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default GridAlbum