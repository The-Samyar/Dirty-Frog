import React from 'react'
import IMG from '../images/AboutRoom.webp'
import { Link } from 'react-router-dom'
import './AboutRoom.css'

const AboutRoom = () => {
  return (
    <div className="AboutRoomContainer">
      <div className="title">
        <h2>Experience Pleasant Moments In Our Hotel</h2>
      </div>

      <div className="AboutCard">
        <div className="leftSide">
          <img src={IMG} alt="AboutRoom" />
        </div>
        <div className="rightSide">
          <div className="information">
            <h4>Different Types of room</h4>
            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
          </div>

          <button className="btn">
            <Link to="/rooms">
              View Rooms
            </Link>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AboutRoom