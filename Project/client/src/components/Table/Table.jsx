import React, { useState, useRef } from 'react'
import { useEffect } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import { useSearchParams } from 'react-router-dom'
import { fetchBookNow, getBookNow } from '../../api/api'
import { useNavigate } from 'react-router-dom'
import HeaderForm from '../HeaderForm/HeaderForm'
import {
    MdBalcony, MdWifi, MdOutlineWaves, MdOutlineSafetyDivider, MdBathtub, MdIron, MdFitnessCenter,
    MdMonitor, MdOutlinePets, MdKitchen, MdVolumeOff
} from 'react-icons/md'
import { GiShower, GiTeapot, GiWoodBeam, GiBugNet, GiElectricalSocket } from 'react-icons/gi'
import { IoMdSnow } from 'react-icons/io'
import { FaGlassCheers, FaSwimmer, FaMountain, FaWind } from 'react-icons/fa'
import './Table.css'

export const Icon = ({ item }) => {
    const map1 = new Map([
        [1, IoMdSnow],
        [2, MdBalcony],
        [3, MdWifi],
        [4, MdOutlineWaves],
        [5, FaMountain],
        [6, GiShower],
        [7, MdOutlineSafetyDivider],
        [8, MdBathtub],
        [9, GiTeapot],
        [10, FaWind],
        [11, GiWoodBeam],
        [12, MdIron],
        [13, FaGlassCheers],
        [14, GiBugNet],
        [15, MdOutlinePets],
        [16, MdKitchen],
        [17, MdFitnessCenter],
        [18, FaSwimmer],
        [19, GiElectricalSocket],
        [20, MdVolumeOff],
        [21, MdMonitor]
    ]);

    const selectedIcon = map1.get(item)

    return selectedIcon ? selectedIcon() : null
}

const Table = () => {

    let [searchParams, setSearchParams] = useSearchParams();
    const [recommended, setRecomended] = useState([])
    const [reserved, setReserved] = useState({ rooms: [] })
    const navigator = useNavigate();

    const ref = useRef();

    useEffect(() => {
        async function sendData() {
            const checkIn = searchParams.get('checkIn');
            const checkOut = searchParams.get('checkOut');
            const rooms = searchParams.get('rooms');
            const adults = searchParams.get('adults');
            const children = searchParams.get('children');
            ref.current.textContent = '';

            const readyData = { checkIn, checkOut, rooms, adults, children }

            if (readyData.rooms !== null) {

                if (readyData.checkIn) {
                    setReserved({ ...reserved, checkIn, checkOut, children, adults });
                }

                const { data } = await fetchBookNow(readyData);
                const { Error, Data } = data
                /* console.log(Error)
                console.log(Data)
                console.log(Data.length); */
                if (Data.length > 0) {

                    setRecomended(Data)
                } else {
                    ref.current.textContent = Error.checkOut
                    setRecomended(null)
                }



            }

            if (!checkIn) {
                const { data } = await getBookNow();
                /* console.log(data); */
                setRecomended(data);
            }


            else {
                console.log('empty');
            }
        }

        sendData();


    }, [searchParams])


    /* console.log(recommended);
    console.log(reserved); */

    const handleForm = (e) => {
        e.preventDefault();
        /* console.log(reserved); */

        if (reserved?.checkIn) {

            if (reserved?.rooms.length > 0) {
                var listOfRooms = '';
                for (let index = 0; index < reserved.rooms.length; index++) {
                    listOfRooms += '&' + Object.keys(reserved.rooms[index]) + '=' + Object.values(reserved.rooms[index])
                }

                const url = `/Booking?checkIn=${reserved?.checkIn}&checkOut=${reserved?.checkOut}&adults=`
                    + `${reserved?.adults}&children=${reserved?.children}${listOfRooms} `
                navigator(url);
            }else{
                ref.current.textContent = 'No room has selected'
            }
        } else {
            ref.current.textContent = 'There is no checkIn or checkOut value'
        }
    }

    const handleChange = (e, roomName) => {
        /* console.log(e.target.value, roomName); */

        setReserved({ ...reserved, rooms: [...reserved.rooms, { [roomName]: e.target.value }] });
    }

    return (
        <>
            <h2 className="title" ref={ref}>{ }</h2>
            <HeaderForm />
            <form>
                <table className="table">
                    <thead>
                        <tr>
                            <th className="tableHeader">Room Type</th>
                            <th className="tableHeader">Sleeps</th>
                            <th className="tableHeader">Price per Night</th>
                            <th className="tableHeader">Services</th>
                            <th className="tableHeader">Select room</th>
                            <th className="tableHeader">Reserve</th>
                        </tr>
                    </thead>

                    <tbody>
                        {recommended &&
                            recommended?.map((room, index) => (
                                <tr key={index}>
                                    <td className="tableCells" id="tempHeader">
                                        <h4 className="titleRoom">
                                            {room.room_name}
                                        </h4>
                                        {
                                            room.description
                                        }
                                    </td>
                                    <td className="smallTableCells">
                                        {
                                            [...Array(room.capacity)].map(item => <PersonIcon key={item} />)
                                        }
                                    </td>
                                    <td className="tableCells">
                                        <span className="roomCost">
                                            {room.cost_per_day} $
                                        </span>
                                    </td>
                                    <td className="tableCellsService">
                                        <div className="tableCellContainer">
                                            <div className="servicesContainer">
                                                {
                                                    room.services.map((service, index) => <span key={index}>{
                                                        Object.keys(service).map(item => {
                                                            return (
                                                                <div className="services">
                                                                    <Icon item={Number(item)} />
                                                                    <span>{service[item]}</span>
                                                                </div>
                                                            )
                                                        })
                                                    }</span>)

                                                }
                                            </div>
                                        </div>
                                    </td>
                                    <td className="tableCells">
                                        <select name="" id="" className="tableSelect" onChange={(e) => handleChange(e, room.room_name)}>
                                            {
                                                room.vacant_count > 6 ?
                                                    <>
                                                        <option value="0">0 &nbsp; &nbsp; &nbsp; ({0 * room.cost_per_day}$)</option>
                                                        <option value="1">1 &nbsp; &nbsp; &nbsp; ({1 * room.cost_per_day}$)</option>
                                                        <option value="2">2 &nbsp; &nbsp; &nbsp; ({2 * room.cost_per_day}$)</option>
                                                        <option value="3">3 &nbsp; &nbsp; &nbsp; ({3 * room.cost_per_day}$)</option>
                                                        <option value="4">4 &nbsp; &nbsp; &nbsp; ({4 * room.cost_per_day}$)</option>
                                                        <option value="5">5 &nbsp; &nbsp; &nbsp; ({5 * room.cost_per_day}$)</option>
                                                        <option value="6">6 &nbsp; &nbsp; &nbsp; ({6 * room.cost_per_day}$)</option>
                                                    </> :

                                                    <>
                                                        {
                                                            [...Array(room.vacant_count)].map(number => (
                                                                <option value={number}>{number} &nbsp; &nbsp; &nbsp; ({number * room.cost_per_day}$)</option>
                                                            ))
                                                        }
                                                    </>
                                            }
                                        </select>
                                    </td>

                                    {
                                        index === 0 ? <td className="ReserveCell">
                                            <button className="buttonTable" onClick={(e) => handleForm(e)}>Reserve</button>
                                        </td> : null
                                    }
                                </tr>

                            ))
                        }


                    </tbody>


                </table>
            </form>
        </>
    )
}

export default Table