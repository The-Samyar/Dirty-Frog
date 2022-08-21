import React, { useState, useEffect } from 'react'
import { sendReservationData, fetchReserveInfo } from '../../api/api'
import './BookingSummary.css'

const BookingSummary = ({ rooms , info }) => {

    console.log(info);
    const [userData, setUserData] = useState();
    const [totalCost , setTotalCost] = useState({total: 0  , tax : 0});
    console.log(userData)

    useEffect(() => {
        setUserData({check_in: info.check_in , check_out: info.check_out , adults: info.adults , children: info.children , room: info.rooms})
    } , [info])

    useEffect(() => {

        const rooms = info?.rooms
        const sum = rooms?.reduce((sum, singleRoom) => {
            console.log('rooms are:', rooms);
            console.log('current iteration' , singleRoom);
            const currentRoom = rooms?.find(currentRoomItem => currentRoomItem.room_name === singleRoom.room_name)
            console.log(currentRoom);
            console.log(singleRoom.cost_per_day)
            return sum + (Number(singleRoom.cost_per_day) * Number(currentRoom.count))
        } , 0)
        console.log(sum);
        setTotalCost({total: sum + (0.09 * sum) + 10 , tax: 0.09 * sum})
    } , [rooms , info])

    useEffect(() => {
        
    } , [totalCost])

    const handleClick = (e) => {
        e.preventDefault();
        console.log(userData)
    }

    return (
        <form className="BookingSummaryCard">
            <div className="BookingSummaryHeader">
                <h3 className="summaryTitle">Your Price Summary</h3>
            </div>

            <div className="BookingSummaryInfo">
                <div className="prices">
                    {
                        rooms?.map((room) => (
                            <div className="signlePrice" key={room.room_name}>
                                <h4 className="priceTitle">{room.room_name}</h4>
                                <span className="priceQuantity">$ {room.cost_per_day}</span>
                            </div>
                        ))
                    }

                    <div className="signlePrice">
                        <h4 className="priceTitle">9 % VAT</h4>
                        <span className="priceQuantity">$ {totalCost.tax}</span>
                    </div>

                    <div className="signlePrice">
                        <h4 className="priceTitle">City tax</h4>
                        <span className="priceQuantity">$ 10</span>
                    </div>

                    <div className="total">
                        <h4 className="totalPriceTitle">Total Price:</h4>
                        <span className="totalPrice">$ {totalCost.total}</span>
                    </div>
                </div>

                <span className="note">* This price is converted to show you the cost in € at today’s exchange rate.</span>

                <button className="finalReserve" onClick={(e) => handleClick(e)}>Reserve Now</button>
            </div>
        </form>
    )
}

export default BookingSummary