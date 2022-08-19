import { useState, useEffect } from 'react'
import './FeaturedRooms.css'
import { fetchFeaturedRooms } from '../../api/api'

const FeaturedRooms = () => {

    const [rooms, setRooms] = useState([{room_name: '' , cost_per_day: 0 , room_pictures: [] , description: ''}])

    useEffect(() => {
        const getData = async() => {
            const data  = await fetchFeaturedRooms()
            const pureData = data.data
            console.log(pureData)
            setRooms(pureData)
        }

        getData()
    }, [])

    console.log(rooms)
    return (
        <section>
            <h3 className="sectionTitle">Featured Rooms</h3>
            <div className="featuredRoomContainer">

                {rooms.map((room ,index) => 
                    (<div className="featuredRoom" key={index}>
                        <div className="imageSection">
                            <img src={room.room_pictures[0]} alt={room.room_name} />
                        </div>
                        <div className="infoSection">
                            <h4 className="infoSectionTitle">{room.room_name}</h4>
                            <span className="cost">${room.cost_per_day}/Night</span>
                            <p className="infoDescription">
                                {room.description}
                            </p>
                        </div>
                    </div>)
                )}
            </div>
        </section>
    )
}

export default FeaturedRooms