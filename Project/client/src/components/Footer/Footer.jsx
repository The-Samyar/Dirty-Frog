import React from 'react'
import './Footer.css'
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
                            <MailOutlineOutlinedIcon  className="informationIcon"></MailOutlineOutlinedIcon>
                        </div>
                        <div className="informationItem">
                            <LocationOnOutlinedIcon  className="informationIcon"></LocationOnOutlinedIcon>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footerItem">
                <div className="footerQuickLink">
                    <div className="footerQuickLinkTitle">
                        <h4 className="Title">Quick Links</h4>
                    </div>
                </div>
            </div>
            <div className="footerItem">

            </div>
        </footer>
    )
}

export default Footer