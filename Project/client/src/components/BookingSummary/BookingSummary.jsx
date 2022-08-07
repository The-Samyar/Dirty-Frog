import React, { useState, useEffect } from 'react'
import { sendReservationData, fetchReserveInfo } from '../../api/api'
import { useSearchParams } from 'react-router-dom'
import './BookingSummary.css'

const BookingSummary = ({ rooms }) => {

    let [searchParams, setSearchParams] = useSearchParams();
    const [userData, setUserData] = useState({ checkIn: '', checkOut: '', rooms: [], adults: '', children: '' })

    useEffect(() => {

        const getData = async () => {

        }

        getData();

    }, [searchParams])

    const handleClick = (e) => {
        e.preventDefault();
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
                            <div className="signlePrice" key={room.roomName}>
                                <h4 className="priceTitle">{room.roomName}</h4>
                                <span className="priceQuantity">$ 120</span>
                            </div>
                        ))
                    }

                    <div className="signlePrice">
                        <h4 className="priceTitle">9 % VAT</h4>
                        <span className="priceQuantity">$ 17</span>
                    </div>

                    <div className="signlePrice">
                        <h4 className="priceTitle">City tax</h4>
                        <span className="priceQuantity">$ 10</span>
                    </div>

                    <div className="total">
                        <h4 className="totalPriceTitle">Total Price:</h4>
                        <span className="totalPrice">$ 347</span>
                    </div>
                </div>

                <span className="note">* This price is converted to show you the cost in € at today’s exchange rate.</span>

                <button className="finalReserve" onClick={(e) => handleClick(e)}>Reserve Now</button>
            </div>
        </form>
    )
}

export default BookingSummary