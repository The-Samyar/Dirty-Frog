import React from 'react'
import './BookingDetail.css'

const BookingDetail = ({ rooms, checkIn, checkOut }) => {
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
              <span className="checkDate">{checkIn}</span>
            </div>

            <div className="checkOut">
              <h4 className="BookingInfoTitle">Check Out:</h4>
              <span className="checkDate">{checkOut}</span>
            </div>
          </div>

          <div className="summaryInfo">
            <h4 className="BookingInfoTitle">Total length of stay:</h4>
            <span className="totalLength">16 nights</span>
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
                rooms.map((room) => (
                  <div className="bookingRoomCount">
                    <h5 className="roomName">{room.roomName}</h5>
                    <span className="roomCount">{room.count}</span>
                  </div>
                ))
              }
            </div>
          </div>

          <button className="btnDetail">Change Your Selection</button>
        </div>
      </div>
    </section>
  )
}

export default BookingDetail