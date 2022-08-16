import React, { Suspense } from 'react'
import { Features } from '../components/Features/Features'
import Header from '../components/Header/Header'
import HeaderForm from '../components/HeaderForm/HeaderForm'
const FeaturedRooms = React.lazy(() => import('../components/FeaturedRooms/FeaturedRooms'))
const Footer = React.lazy(() => import('../components/Footer/Footer'))
const Testimonials = React.lazy(() => import('../components/Testimonials/Testimonials'))
const Stats = React.lazy(() => import('../components/Stats/Stats'))

const Home = () => {
  return (
    <div>
      <Header />
      <HeaderForm main />
      <Features />
      <Suspense fallback={<div>Loading ...</div>}>
        <FeaturedRooms />
      </Suspense>
      <Suspense fallback={<div>Loading ...</div>}>
        <Stats />
      </Suspense>
      <Suspense fallback={<div>Loading ...</div>}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<div>Loading ...</div>}>
        <Footer />
      </Suspense>
    </div>
  )
}

export default Home