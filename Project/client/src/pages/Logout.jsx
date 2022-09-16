import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {

  const navigator = useNavigate();

  useEffect(() => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');

    navigator('/')
  })


  return (
    <div>Logout</div>
  )
}

export default Logout