
import React from 'react'
import './Footer.css'
import {Link} from 'react-router-dom'
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import LocalPhoneSharpIcon from '@mui/icons-material/LocalPhoneSharp';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';


const Footer = () => {

    return (
        <footer className="footerContainer">
            <div className="footerItem">
                <div className="footerContactUs">
                    <div className="footerContactUsTitle">
                        <h4 className="Title">Contact Us</h4>
                    </div>
                    <div className="Information">
                        <div className="informationItem">
                            <LocalPhoneSharpIcon className="informationIcon"></LocalPhoneSharpIcon>
                            <span className="informationDescription">+12 345-678-9999</span>
                        </div>
                        <div className="informationItem">
                            <MailOutlineOutlinedIcon className="informationIcon"></MailOutlineOutlinedIcon>
                            <span className="informationDescription">info@yourdomain.com</span>
                        </div>
                        <div className="informationItem">
                            <LocationOnOutlinedIcon className="informationIcon"></LocationOnOutlinedIcon>
                            <span className="informationDescription">	203 Fake St. Mountain View, San Francisco, California, USA</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footerItem">
                <div className="footerQuickLink">
                    <div className="footerQuickLinkTitle">
                        <h4 className="Title">Quick Links</h4>
                    </div>
                    <div className="linksContainer">
                        <Link to="/" className="links">Home</Link>
                        <Link to="/signUp" className="links">Sign Up</Link>
                        <Link to="/signIn" className="links">Sign In</Link>
                        <Link to="/rooms" className="links">Rooms</Link>
                        <Link to="/aboutUs" className="links">About Us</Link>
                    </div>
                </div>
            </div>
            <div className="footerItem">
                <div className="mapContainer">
                    <LoadScript
                        googleMapsApiKey="AIzaSyB6z3QIgN40KZ4LIxVI-OlioBgTLQfXTKs"
                    >
                        <GoogleMap
                            mapContainerStyle={{
                                width: '100%',
                                height: '300px'
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
        </footer>
    )
}

export default Footer