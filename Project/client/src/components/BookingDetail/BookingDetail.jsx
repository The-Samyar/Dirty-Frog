import React from 'react'
import './BookingDetail.css'
import {Link} from 'react-router-dom'

const BookingDetail = ({ rooms, checkIn, checkOut }) => {
console.log(checkIn)
  const checkInDate = new Date(checkIn).toDateString();
  const checkOutDate = new Date(checkOut).toDateString();
  const diffTime = Math.abs(new Date(checkOut) - new Date(checkIn));
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return (
    <section className="BookingDetailContainer">
      <div className="BookingDetailHeader">
        <h4 className="BookingDetailTitle">Your booking details</h4>
      </div>

      <div className="bookingInfo">
        <div className="bookingInfoInner">
          <div className="date">
            <div className="checkIn">
              <h4 className="BookingInfoTitle">Check In:</h4>
              <span className="checkDate">{checkInDate}</span>
            </div>

            <div className="checkOut">
              <h4 className="BookingInfoTitle">Check Out:</h4>
              <span className="checkDate">{checkOutDate}</span>
            </div>
          </div>

          <div className="summaryInfo">
            <h4 className="BookingInfoTitle">Total length of stay:</h4>
            <span className="totalLength">{diffDays} nights</span>
          </div>

          <br />
          <hr />

          <div className="summaryInfo">
            <h4 className="BookingInfoTitle">You Selected: </h4>
            <div className="bookingRoomsSummary">
              <div className="bookingRoomHeader">
                <h5 className="roomName">Room Name</h5>
                <h5 className="roomCount">Number of room(s)</h5>
              </div>
              {
                rooms?.map((room) => (
                  <div className="bookingRoomCount" key={room.room_name}>
                    <h5 className="roomName">{room.room_name}</h5>
                    <span className="roomCount">{room.count}</span>
                  </div>
                ))
              }
            </div>
          </div>

          <button className="btnDetail">
            <Link to="/BookNow">Change Your Selection</Link>
          </button>
        </div>
      </div>
    </section>
  )
}

export default BookingDetail