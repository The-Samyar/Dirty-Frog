import React ,{useState , useEffect} from 'react'
import Footer from '../components/Footer/Footer'
import { useParams } from 'react-router-dom'
import { getRoomDetails } from '../api/api'
import RoomHeader from '../components/RoomHeader/RoomHeader'
import RoomSummary from '../components/RoomSummary/RoomSummary'
import RoomDetails from '../components/RoomDetails/RoomDetails'

const RoomPage = () => {

  const [Room, setRoom] = useState(null)
  let {name} = useParams()

  useEffect(() => {
    const getRoom = async () =>{
      const {data} = await getRoomDetails(name);
      console.log(data)
      setRoom(data)
    }

    getRoom();
  }, [])
  


  
  return (
    Room && <div>
      <RoomHeader name={Room.room_name} cost={Room.cost_per_day} capacity={Room.capacity} />
      <RoomSummary services={Room.services} />
      <RoomDetails description={Room.description}/>
      <Footer />
    </div>
  )
}

export default RoomPage