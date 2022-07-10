import React, { useState } from 'react'
import { useEffect } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import { useSearchParams } from 'react-router-dom'
import { fetchBookNow } from '../../api/api'
import './Table.css'

const Table = () => {

    let [searchParams, setSearchParams] = useSearchParams();
    const [recommended, setRecomended] = useState({})
    const [existance, setExistance] = useState(false)

    useEffect(() => {
        async function sendData() {
            const checkIn = searchParams.get('checkIn');
            const checkOut = searchParams.get('checkOut');
            const rooms = searchParams.get('rooms');
            const adults = searchParams.get('adults');
            const children = searchParams.get('children');

            const readyData = { checkIn, checkOut, rooms, adults, children }

            if (readyData.rooms !== null) {
                const { data } = await fetchBookNow(readyData);
                console.log(data)

                if (data.length > 0) {

                    setRecomended(data)
                    setExistance(true)
                }

            } else {
                console.log('empty');
            }
        }

        sendData();


    }, [])

    console.log(recommended);
    return (
        <form>
            <table className="table">
                <tr>
                    <th className="tableHeader">Room Type</th>
                    <th className="tableHeader">Sleeps</th>
                    <th className="tableHeader">Price per Night</th>
                    <th className="tableHeader">Services</th>
                    <th className="tableHeader">Select room</th>
                    <th className="tableHeader">Reserve</th>
                </tr>

                {existance &&
                    recommended?.map((room, index) => (
                        <tr key={index}>
                            <td className="tableCells">
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
                            <td className="tableCells">
                                <div className="tableCellContainer">
                                    <span>Private kitchen</span>
                                    <span>Air conditioning</span>
                                    <span>Free WiFi</span>
                                </div>
                            </td>
                            <td className="tableCells">
                                <select name="" id="" className="tableSelect">
                                    <option value="0">0 &nbsp; &nbsp; &nbsp; ({0 * room.cost_per_day}$)</option>
                                    <option value="1">1 &nbsp; &nbsp; &nbsp; ({1 * room.cost_per_day}$)</option>
                                    <option value="2">2 &nbsp; &nbsp; &nbsp; ({2 * room.cost_per_day}$)</option>
                                    <option value="3">3 &nbsp; &nbsp; &nbsp; ({3 * room.cost_per_day}$)</option>
                                    <option value="4">4 &nbsp; &nbsp; &nbsp; ({4 * room.cost_per_day}$)</option>
                                    <option value="5">5 &nbsp; &nbsp; &nbsp; ({5 * room.cost_per_day}$)</option>
                                    <option value="6">6 &nbsp; &nbsp; &nbsp; ({6 * room.cost_per_day}$)</option>
                                </select>
                            </td>

                            {
                                index === 0 ? <td className="ReserveCell">
                                    <input type="submit" className="buttonTable" value="Reserve" />
                                </td> : null
                            }
                        </tr>

                    ))
                }

                {
                    !existance && <div className="errorCell">Not found</div>
                }


            </table>
        </form>
    )
}

export default Table