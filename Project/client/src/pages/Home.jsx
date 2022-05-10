import React from 'react'
import FeaturedRooms from '../components/FeaturedRooms/FeaturedRooms'
import { Features } from '../components/Features/Features'
import Header from '../components/Header/Header'
import HeaderForm from '../components/HeaderForm/HeaderForm'
import Stats from '../components/Stats/Stats'
import Testimonials from '../components/Testimonials/Testimonials'

const Home = () => {
  return (
    <div>
        <Header />
        <HeaderForm />
        <Features />
        <FeaturedRooms />
        <Stats />
        <Testimonials />
    </div>
  )
}

export default Home