import React from 'react'
import IMG from '../images/about.webp'
import './AboutInfo.css'

const AboutInfo = () => {
    return (
        <div className="AboutContainer">
            <div className="leftSection">
                <div className="colored">
                    <img src={IMG} alt="restaurant" />
                </div>

                <div className="white"></div>
            </div>

            <div className="rightSection">
                <div className="description">
                    <h3>A well known hotel among oceans</h3>
                    <p>
                        Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.
                        <br/>
                        <br/>
                        A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AboutInfo