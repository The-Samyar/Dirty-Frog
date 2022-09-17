import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import ProfileSideBar from '../components/ProfileSideBar/ProfileSideBar'
import ProfileMainCard from '../components/ProfileMainCard/ProfileMainCard'
import '../assets/pageStyles/Profile.css'

const Profile = () => {
  return (
    <div className='profileContainer'>
      <Navbar />
      <main className="mainProfile">
        <ProfileSideBar />
        <ProfileMainCard />
      </main>
      <Footer />
    </div>
  )
}

export default Profile