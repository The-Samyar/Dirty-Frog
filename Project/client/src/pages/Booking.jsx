import React, { useEffect , useState } from 'react'
import {fetchReserveInfo} from '../api/api'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import BookingDetail from '../components/BookingDetail/BookingDetail'
import RoomsCard from '../components/RoomsCard/RoomsCard'
import BookingSummary from '../components/BookingSummary/BookingSummary'

const Booking = () => {

  const [info , setInfo] = useState({})
  const [roomData , setRoomData] = useState()

  useEffect(() => {
    const url = window.location.href;
    /* console.log(url); */
    const rootUrl = window.location.origin + '/Booking'
    const rootUrlLength = rootUrl.length
    /* console.log(rootUrlLength); */
    const params = url.slice(rootUrlLength + 1)

    const values = params.split('&');
    let check_in, check_out, adults, children, rooms = [] ,roomsName = [];
    for (const key in values) {
      var item = values[key];
      item = item.split('=');

      switch (item[0]) {
        case 'checkIn':
          check_in = item[1];
          /* console.log(check_in); */
          break;

        case 'checkOut':
          check_out = item[1];
          /* console.log(check_out); */
          break;

        case 'adults':
          adults = item[1];
          /* console.log(adults); */
          break;

        case 'children':
          children = item[1];
          /* console.log(children); */
          break;

        default:
          roomsName.push(item[0].replace(/%20/g, " "));
          rooms.push({ room_name: item[0].replace(/%20/g, " "), count: item[1] });
         /*  console.log(rooms); */

      }
        setInfo({check_in , check_out , rooms , adults , children})
    }

    const getData = async() => {
      /* console.log(roomsName); */
      const {data} = await fetchReserveInfo({room : roomsName});
      /* console.log(data) */
      setRoomData(data)
    }

    getData()
  }, [])

  return (
    <div>
      <Navbar covered />
      <BookingDetail rooms={info?.rooms} checkIn={info?.check_in} checkOut={info?.check_out} />
      <RoomsCard rooms={roomData} guests={Number(info?.adults) + Number(info?.children)}/>
      <BookingSummary rooms={roomData} info={info} />
      <Footer />
    </div>
  )
}

export default Booking