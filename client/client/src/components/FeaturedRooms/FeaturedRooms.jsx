import React from 'react'
import './FeaturedRooms.css'
import IMG1 from '../images/room1.jpg'
import IMG2 from '../images/room2.jpg'
import IMG3 from '../images/room3.jpg'


const FeaturedRooms = () => {
    return (
        <section>
            <h3 className="sectionTitle">Featured Rooms</h3>
            <div className="featuredRoomContainer">
                
                <div className="featuredRoom">
                    <div className="imageSection">
                        <img src={IMG1} alt="King Room" />
                    </div>
                    <div className="infoSection">
                        <h4 className="infoSectionTitle">King Room</h4>
                        <span className="cost">$140/Night</span>
                        <p className="infoDescription">
                            Far far away, behind the word mountains, far from the countries Vokalia
                             and Consonantia, there live the blind texts.
                        </p>
                    </div>
                </div>

                <div className="featuredRoom">
                    <div className="imageSection">
                        <img src={IMG2} alt="Deluxe Room" />
                    </div>
                    <div className="infoSection">
                        <h4 className="infoSectionTitle">King Room</h4>
                        <span className="cost">$140/Night</span>
                        <p className="infoDescription">
                            Far far away, behind the word mountains, far from the countries Vokalia
                             and Consonantia, there live the blind texts.
                        </p>
                    </div>
                </div>

                <div className="featuredRoom">
                    <div className="imageSection">
                        <img src={IMG3} alt="Suit Room" />
                    </div>
                    <div className="infoSection">
                        <h4 className="infoSectionTitle">King Room</h4>
                        <span className="cost">$140/Night</span>
                        <p className="infoDescription">
                            Far far away, behind the word mountains, far from the countries Vokalia
                             and Consonantia, there live the blind texts.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FeaturedRooms