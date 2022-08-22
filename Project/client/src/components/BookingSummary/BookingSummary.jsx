import React, { useState, useEffect } from 'react'
import { sendReservationData } from '../../api/api'
import './BookingSummary.css'

const BookingSummary = ({ rooms , info }) => {

    const [userData, setUserData] = useState();
    const [totalCost , setTotalCost] = useState({total: 0  , tax : 0 , eachRoomTotalCost: []});
    
    
    useEffect(() => {
        setUserData({check_in: info.check_in , check_out: info.check_out , adults_count: info.adults , children_count: info.children , rooms: info.rooms})
    } , [info])
    
    useEffect(() => {
        
        var eachRoomTotalCost = [];
        const roomsData = info?.rooms
        const sum = roomsData?.reduce((sum, singleRoom) => {
            
            const currentRoom = rooms?.find(currentRoomItem => currentRoomItem.room_name === singleRoom.room_name)
            const costPerDay = Number(currentRoom?.cost_per_day);
            const roomCount = Number(singleRoom?.count);
            const total = (costPerDay * roomCount);

            eachRoomTotalCost.push(total); 
            
            return sum + total;
        } , 0)

        setTotalCost({total: sum + (0.09 * sum) + 10 , tax: 0.09 * sum , eachRoomTotalCost})
    } , [rooms , info])

    useEffect(() => {
        
    } , [totalCost])

    const handleClick = async(e) => {
        e.preventDefault();
        console.log(userData);

        const {data} = await sendReservationData(userData);
        console.log(data);

    }

    return (
        <form className="BookingSummaryCard">
            <div className="BookingSummaryHeader">
                <h3 className="summaryTitle">Your Price Summary</h3>
            </div>

            <div className="BookingSummaryInfo">
                <div className="prices">
                    {
                        rooms?.map((room , index) => (
                            <div className="signlePrice" key={room.room_name}>
                                <h4 className="priceTitle">{room.room_name}</h4>
                                <span className="priceQuantity">$ {
                                    totalCost.eachRoomTotalCost[index]
                                }</span>
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