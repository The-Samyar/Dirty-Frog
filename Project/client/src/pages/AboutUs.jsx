import React, { Suspense } from 'react'
import AboutHeader from '../components/AboutHeader/AboutHeader'
const AboutInfo = React.lazy(() => import('../components/AboutInfo/AboutInfo'))
const AboutRoom = React.lazy(() => import('../components/AboutRoom/AboutRoom'))
const AboutOffer = React.lazy(() => import('../components/AboutOffer/AboutOffer'))
const Footer = React.lazy(() => import('../components/Footer/Footer'))

const AboutUs = () => {
  return (
    <div>
      <AboutHeader />
      <Suspense fallback={<div>Loading ...</div>}>
        <AboutInfo />
      </Suspense>
      <Suspense fallback={<div>Loading ...</div>}>
        <AboutRoom />
      </Suspense>
      <Suspense fallback={<div>Loading ...</div>}>
        <AboutOffer />
      </Suspense>
      <Suspense fallback={<div>Loading ...</div>}>
        <Footer />
      </Suspense>
    </div>
  )
}

export default AboutUs