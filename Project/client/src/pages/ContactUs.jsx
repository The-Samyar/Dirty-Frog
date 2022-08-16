import React, { Suspense } from 'react'
import ContactHeader from '../components/ContactHeader/ContactHeader'
const ContactMain = React.lazy(() => import('../components/ContactMain/ContactMain'))
const Footer = React.lazy(() => import('../components/Footer/Footer'))

const ContactUs = () => {
  return (
    <div>
      <ContactHeader />
      <Suspense fallback={<div>Loading ...</div>}>
        <ContactMain />
      </Suspense>
      <Suspense fallback={<div>Loading ...</div>}>
        <Footer />
      </Suspense>
    </div>
  )
}

export default ContactUs