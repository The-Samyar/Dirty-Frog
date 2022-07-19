import React from 'react'
import './ContactMain.css'
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { BsTelegram, BsInstagram, BsTwitter, BsLinkedin } from 'react-icons/bs'

const ContactMain = () => {
    return (
        <div className="ContactMainContainer">
            <div className="leftSection">
                <h3>Get In Touch</h3>
                <p>
                    Far far away, behind the word mountains, far from the countries Vokalia and Consonantia,
                    there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics,
                    a large language ocean.
                </p>
                <form className="form">
                    <div className="inputsContainer">
                        <div className="inputContainer">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" />
                        </div>

                        <div className="inputContainer">
                            <label htmlFor="email">Email</label>
                            <input type="text" id="email" />
                        </div>
                    </div>
                    <textarea name="" id="" cols="30" rows="10" placeholder="Enter your message"></textarea>
                    <button>Send Message</button>
                </form>
            </div>

            <div className="rightSection">
                <div className="upper">
                    <div className="firstRow">
                        <div className="info">
                            <h4 className="titleInfo">Address</h4>
                            <span className="contactInfo">
                                203 Fake St. Mountain View, San Francisco,
                                <br />
                                 California, USA
                            </span>
                        </div>
                        <div className="info">
                            <h4 className="titleInfo">Phone</h4>
                            <span className="contactInfo">+12 345-678-9999</span>
                        </div>
                    </div>

                    <div className="secondRow">
                        <div className="info">
                            <h4 className="titleInfo">Email</h4>
                            <span className="contactInfo">info@yourdomain.com</span>
                        </div>
                        <div className="info">
                            <h4 className="titleInfo">Social Media</h4>
                            <div className="contactIcons">
                                <span><BsTelegram /></span>
                                <span><BsInstagram /></span>
                                <span><BsTwitter /></span>
                                <span><BsLinkedin /></span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lower">
                    <LoadScript
                        googleMapsApiKey="AIzaSyB6z3QIgN40KZ4LIxVI-OlioBgTLQfXTKs"
                    >
                        <GoogleMap
                            mapContainerStyle={{
                                width: '100%',
                                height: '100%'
                            }}
                            center={{
                                lat: 3.745,
                                lng: 38.523
                            }}
                            zoom={10}
                        >
                        </GoogleMap>
                    </LoadScript>
                </div>
            </div>
        </div>
    )
}

export default ContactMain