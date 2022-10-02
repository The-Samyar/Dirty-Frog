import React from 'react'
import './ProfileSideBar.css'
import { AiOutlinePaperClip } from 'react-icons/ai'

const ProfileSideBar = () => {
    return (
        <div className='profileSideBarContainer'>
            <div className="profileSideBarCard">
                <div className="innerProfileCard">
                    <div className="profileImgContainer">
                        <img src="../images/person1.webp" alt="profileImg" />
                    </div>

                    <div className="profileInfo">
                        <h6 className="profileUserName">John_Doe1988</h6>
                        <div className="profileName">
                            <span className="Name">John</span>
                            <span className="Name">Doe</span>
                        </div>

                        <div className="furtherInfo">
                            <span className="email">John_Doe1988@gmail.com</span>
                            <span className="Phone">09126698585</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="profileSideBarUpload">
                <h6 className="uploadTitle">Select Profile Image</h6>
                <div className="uploadSection">
                    <div className="uploadIcon">
                        <label htmlFor="file-input">
                            <AiOutlinePaperClip />
                        </label>

                        <input id="file-input" type="file" />
                    </div>

                    <div className="uploadDesc">
                        <span className="uploadDescItem">Choose Your Image</span>
                        <span className="uploadDescItem">JPG, WEBP, PNG max size 600kB</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileSideBar