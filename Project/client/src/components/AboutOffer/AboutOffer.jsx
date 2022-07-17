import React from 'react'
import IMG1 from '../images/bar.jpg'
import IMG2 from '../images/pool.jpg'
import IMG3 from '../images/rest.jpg'
import './AboutOffer.css'


const AboutOffer = () => {
    return (
        <div className="AboutOfferContainer">
            <div className="title">
                <h2>What We Offer To Our Guests</h2>
            </div>

            <div className="offerings">
                <div className="sections" id="section1">
                    <div className="overlay">
                        <h3>Free Breakfast</h3>
                        <p>
                            Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.
                            Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.
                        </p>
                    </div>
                    <h3>Free Breakfast</h3>
                </div>

                <div className="sections" id="section2">
                    <div className="overlay">
                        <h3>Free Pool</h3>
                        <p>
                            Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.
                            Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.
                        </p>
                    </div>
                    <h3>Free Pool</h3>
                </div>

                <div className="sections" id="section3">
                    <div className="overlay">
                        <h3>Free Bar</h3>
                        <p>
                            Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.
                            Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.
                        </p>
                    </div>
                    <h3>Free Bar</h3>
                </div>
            </div>
        </div>
    )
}

export default AboutOffer