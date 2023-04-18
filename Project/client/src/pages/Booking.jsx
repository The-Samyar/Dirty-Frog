import React, { useEffect, useState } from 'react'
import { fetchReserveInfo } from '../api/api'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import BookingDetail from '../components/BookingDetail/BookingDetail'
import RoomsCard from '../components/RoomsCard/RoomsCard'
import BookingSummary from '../components/BookingSummary/BookingSummary'

const Booking = () => {

  const [info, setInfo] = useState({})
  const [roomData, setRoomData] = useState()

  useEffect(() => {
    const url = window.location.href;
    const rootUrl = window.location.origin + '/Booking'
    const rootUrlLength = rootUrl.length
    const params = url.slice(rootUrlLength + 1)

    const values = params.split('&');
    let check_in, check_out, adults, children, rooms = [], roomsName = [];
    for (const key in values) {
      var item = values[key];
      item = item.split('=');

      switch (item[0]) {
        case 'checkIn':
          check_in = item[1];
          break;

        case 'checkOut':
          check_out = item[1];
          break;

        case 'adults':
          adults = item[1];
          break;

        case 'children':
          children = item[1];
          break;

        default:
          roomsName.push(item[0].replace(/%20/g, " "));
          rooms.push({ room_name: item[0].replace(/%20/g, " "), count: item[1] });
          console.log(rooms);

      }

      const diffTime = Math.abs(new Date(check_out) - new Date(check_in));
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setInfo({ check_in, check_out, rooms, adults, children , diffDays })
    }

    const getData = async () => {
      const { data } = await fetchReserveInfo({ room: roomsName });
      setRoomData(data)
    }

    getData()
  }, [])

  return (
    <div>
      <Navbar covered />
      <BookingDetail diffDays={info?.diffDays} rooms={info?.rooms} checkIn={info?.check_in} checkOut={info?.check_out} />
      <RoomsCard rooms={roomData} guests={Number(info?.adults) + Number(info?.children)} />
      <BookingSummary diffDays={info?.diffDays} rooms={roomData} info={info} />
      <Footer />
    </div>
  )
}

export default Booking