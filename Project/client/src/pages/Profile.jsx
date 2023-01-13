import React , {useState , useEffect} from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import ProfileSideBar from '../components/ProfileSideBar/ProfileSideBar'
import ProfileMainCard from '../components/ProfileMainCard/ProfileMainCard'
import {getUserData} from '../api/api'
import '../assets/pageStyles/Profile.css'

const Profile = () => {

  const [profileInfo , setProfileInfo] = useState();


    useEffect(() => {
        const getProfileData = async() => {
            const {data} = await getUserData();
            console.log(data);

            setProfileInfo(data);
        }

        getProfileData();
    } , [])

  return (
    <div className='profileContainer'>
      <Navbar />
      <main className="mainProfile">
        <ProfileSideBar profileInfo={profileInfo} />
        <ProfileMainCard profileInfo={profileInfo} />
      </main>
      <Footer />
    </div>
  )
}

export default Profile