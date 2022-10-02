import React, { useState , useEffect } from 'react'
import {getUserData , sendProfileChange , sendChangePassData} from '../../api/api'
import './ProfileMainCard.css'

const ProfileMainCard = () => {

    const EDIT_PROFILE = 'Edit Profile'
    const EDIT_PASSWORD = 'Edit Password'

    const [activeTab, setActiveTab] = useState(EDIT_PROFILE);
    const [enableEdit, setEnableEdit] = useState(false);
    const [profileFormData , setProfileFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '', 
        username: '', 
        gender: ''
    })

    const [passwordFormData , setPasswordFormData] = useState({
        old_password: '',
        new_password: '',
        confirm_new_password: '',
    })

    useEffect(() => {
        const getData = async() => {
            /* const {data} = await getUserData(); */
        }

        getData();

    } , [])

    const handleEdit = (e) => {
        e.preventDefault();
        setEnableEdit(true)
    }

    const handleTabChange = () => {
        activeTab === EDIT_PROFILE ? setActiveTab(EDIT_PASSWORD) : setActiveTab(EDIT_PROFILE)
    }

    const handleChangeInfo = (e) => {
        e.preventDefault();

        console.log(profileFormData)
    }

    const handlePasswordForm = (e) => {
        e.preventDefault();

        console.log(passwordFormData)
    }

    return (
        <div className='profileMainCardContainer'>
            <div className="profileMainCard">
                <div className="ProfileMainInnerCard">
                    <div className="cardTabsContainer">
                        <ul className="cardTabs">
                            <li className={`cardTabItem ${activeTab === EDIT_PROFILE? "activeTab" : ""}`} onClick={() => handleTabChange()}>
                                Edit Information
                            </li>

                            <li className={`cardTabItem ${activeTab === EDIT_PASSWORD? "activeTab" : ""}`} onClick={() => handleTabChange()}>
                                Change Password
                            </li>
                        </ul>
                    </div>

                    {
                        activeTab === EDIT_PROFILE ?
                            <form className="profileForm">
                                <h5 className="profileFormTitle">Profile Information</h5>
                                <div className="profileFormInputs">
                                    <div className="profileInputItem">
                                        <label htmlFor="firstName">First Name</label>
                                        <input type="text" name="first_name" id="firstName" disabled={!enableEdit} onChange={(e) => setProfileFormData({...profileFormData, first_name: e.target.value})}/>
                                    </div>
                                    <div className="profileInputItem">
                                        <label htmlFor="lastName">Last Name</label>
                                        <input type="text" name="last_name" id="lastName" disabled={!enableEdit} onChange={(e) => setProfileFormData({...profileFormData, last_name: e.target.value})} />
                                    </div>
                                    <div className="profileInputItem">
                                        <label htmlFor="email">Email</label>
                                        <input type="text" name="email" id="email" disabled={!enableEdit} onChange={(e) => setProfileFormData({...profileFormData, email: e.target.value})}/>
                                    </div>
                                    <div className="profileInputItem">
                                        <label htmlFor="Phone">Phone</label>
                                        <input type="text" name="phone" id="Phone" disabled={!enableEdit} onChange={(e) => setProfileFormData({...profileFormData, phone: e.target.value})}/>
                                    </div>
                                    <div className="profileInputItem">
                                        <label htmlFor="userName">Username</label>
                                        <input type="text" name="username" id="userName" disabled={!enableEdit} onChange={(e) => setProfileFormData({...profileFormData, username: e.target.value})}/>
                                    </div>
                                    <div className="profileInputItem">
                                        <label htmlFor="gender">Gender</label>
                                        <input type="text" name="gender" id="gender" disabled={enableEdit} onChange={(e) => setProfileFormData({...profileFormData, gender: e.target.value})}/>
                                    </div>
                                    <div className="profileInputItem">
                                        <button className="profileBtn" onClick={(e) => handleChangeInfo(e)}>Save Changes</button>
                                    </div>
                                    <div className="profileInputItem">
                                        <button className="profileBtn" onClick={(e) => handleEdit(e)}>Edit Information</button>
                                    </div>
                                </div>
                            </form> :

                            <form className="profileForm">
                                <h5 className="profileFormTitle">Change Password</h5>
                                <div className="profileFormInputs">
                                    <div className="profileInputItem">
                                        <label htmlFor="oldPassword">Old Password</label>
                                        <input type="password" name="old_password" id="oldPassword" onChange={(e) => setPasswordFormData({...passwordFormData , old_password: e.target.value})} />
                                    </div>
                                    <div className="profileInputItem">
                                        <label htmlFor="newPassword">New Password</label>
                                        <input type="password" name="new_password" id="newPassword" onChange={(e) => setPasswordFormData({...passwordFormData , new_password: e.target.value})}/>
                                    </div>
                                    <div className="profileInputItem">
                                        <label htmlFor="confirm_new_password">Confirm New Password</label>
                                        <input type="password" name="confirm_new_password" id="confirm_new_password" onChange={(e) => setPasswordFormData({...passwordFormData , confirm_new_password: e.target.value})} />
                                    </div>
                                    <div className="profileInputItem">
                                        <button className="profileBtn" onClick={(e) => handlePasswordForm(e)}>Save Changes</button>
                                    </div>
                                </div>
                            </form>
                    }
                </div>
            </div>
        </div>
    )
}

export default ProfileMainCard