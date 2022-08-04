import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getRoomsSummary } from '../../api/api'
import './GridAlbum.css'

const GridAlbum = () => {

    const [Rooms, setRooms] = useState(null);

    useEffect(() => {
        const getRooms = async () => {
            const { data } = await getRoomsSummary();
            console.log(data)

            setRooms(data);
        }

        getRooms();
    }, [])


    return (
       Rooms && <div className="albumContainer">
            <div className="albumGridContainer">
                <div className="item" id="item1">
                    <span>{Rooms[0].room_name}</span>
                    <div className="itemOverlay">
                        <div className="overlayBtn">
                            <Link to={`/room/${Rooms[0].room_name}/`} >Show Room</Link>
                        </div>
                    </div>
                </div>

                <div className="item" id="item2">
                    <span>item</span>
                    <div className="itemOverlay">
                        <div className="overlayBtn">
                            <Link to="/room/2" >Show Room</Link>
                        </div>
                    </div>
                </div>

                <div className="item" id="item3">
                    <span>item</span>
                    <div className="itemOverlay">
                        <div className="overlayBtn">
                            <Link to="/room/3" >Show Room</Link>
                        </div>
                    </div>
                </div>

                <div className="item" id="item4">
                    <span>item</span>
                    <div className="itemOverlay">
                        <div className="overlayBtn">
                            <Link to="/room/4" >Show Room</Link>
                        </div>
                    </div>
                </div>

                <div className="item" id="item5">
                    <span>item</span>
                    <div className="itemOverlay">
                        <div className="overlayBtn">
                            <Link to="/room/5" >Show Room</Link>
                        </div>
                    </div>
                </div>

                <div className="item" id="item6">
                    <span>item</span>
                    <div className="itemOverlay">
                        <div className="overlayBtn">
                            <Link to="/room/6" >Show Room</Link>
                        </div>
                    </div>
                </div>

                <div className="item" id="item7">
                    <span>item</span>
                    <div className="itemOverlay">
                        <div className="overlayBtn">
                            <Link to="/room/7" >Show Room</Link>
                        </div>
                    </div>
                </div>

                <div className="item" id="item8">
                    <span>item</span>
                    <div className="itemOverlay">
                        <div className="overlayBtn">
                            <Link to="/room/8" >Show Room</Link>
                        </div>
                    </div>
                </div>

                <div className="item" id="item9">
                    <span>item</span>
                    <div className="itemOverlay">
                        <div className="overlayBtn">
                            <Link to="/room/9" >Show Room</Link>
                        </div>
                    </div>
                </div>

                <div className="item" id="item10">
                    <span>item</span>
                    <div className="itemOverlay">
                        <div className="overlayBtn">
                            <Link to="/room/10" >Show Room</Link>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default GridAlbum