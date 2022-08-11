import React, { useEffect , useState } from 'react'
import {fetchReserveInfo} from '../api/api'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import BookingDetail from '../components/BookingDetail/BookingDetail'
import RoomsCard from '../components/RoomsCard/RoomsCard'
import BookingSummary from '../components/BookingSummary/BookingSummary'

const Booking = () => {

  const [info , setInfo] = useState({})

  useEffect(() => {
    const url = window.location.href;
    console.log(url);
    const rootUrl = window.location.origin + '/Booking'
    const rootUrlLength = rootUrl.length
    console.log(rootUrlLength);
    const params = url.slice(rootUrlLength + 1)

    const values = params.split('&');
    let checkIn, checkOut, adults, children, rooms = [];
    for (const key in values) {
      var item = values[key];
      item = item.split('=');

      switch (item[0]) {
        case 'checkIn':
          checkIn = item[1];
          console.log(checkIn);
          break;

        case 'checkOut':
          checkOut = item[1];
          console.log(checkOut);
          break;

        case 'adults':
          adults = item[1];
          console.log(adults);
          break;

        case 'children':
          children = item[1];
          console.log(children);
          break;

        default:
          rooms.push({ roomName: item[0].replace(/%20/g, " "), count: item[1] });
          console.log(rooms);

      }
        setInfo(checkIn , checkOut , rooms)
    }

    const getData = async() => {
      /* const {data} = await fetchReserveInfo({rooms}) */

    }

    getData()
  }, [])


  console.log(info);

  return (
    <div>
      <Navbar covered />
      <BookingDetail rooms={info?.rooms} checkIn={info?.checkIn} checkOut={info?.checkOut} />
      <RoomsCard rooms={info?.rooms} />
      <BookingSummary rooms={info?.rooms} />
      <Footer />
    </div>
  )
}

export default Booking