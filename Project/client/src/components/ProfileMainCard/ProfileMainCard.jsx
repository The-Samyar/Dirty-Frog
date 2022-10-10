import React, { useState, useEffect, useRef } from 'react'
import { getUserData, sendProfileChange, sendChangePassData } from '../../api/api'
import './ProfileMainCard.css'

const ProfileMainCard = () => {

    const EDIT_PROFILE = 'Edit Profile'
    const EDIT_PASSWORD = 'Edit Password'
    const History = 'Reserve History'


    const [activeTab, setActiveTab] = useState(EDIT_PROFILE);
    const [enableEdit, setEnableEdit] = useState(false);
    const ref = useRef();
    const [profileFormData, setProfileFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        username: '',
        gender: '',
        birth_date: '',
    })

    const [passwordFormData, setPasswordFormData] = useState({
        old_password: '',
        new_password: '',
        confirm_new_password: '',
    })

    useEffect(() => {
        const getData = async () => {
            /* const {data} = await getUserData(); */
        }

        getData();

    }, [])

    console.log(activeTab);

    const handleEdit = (e) => {
        e.preventDefault();
        setEnableEdit(true)
        ref.current.focus();
    }

    const handleTabChange = (tab) => {
        /* activeTab === EDIT_PROFILE ? setActiveTab(EDIT_PASSWORD) : setActiveTab(EDIT_PROFILE) */

        switch (tab) {
            case EDIT_PROFILE:
                setActiveTab(EDIT_PROFILE);
                break;
            case EDIT_PASSWORD:
                setActiveTab(EDIT_PASSWORD);
                break;
            case History:
                setActiveTab(History);
                break;
            default:
                return;
        }

        setEnableEdit(false)
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
                            <li className={`cardTabItem ${activeTab === EDIT_PROFILE ? "activeTab" : ""}`} onClick={() => handleTabChange(EDIT_PROFILE)}>
                                Edit Information
                            </li>

                            <li className={`cardTabItem ${activeTab === EDIT_PASSWORD ? "activeTab" : ""}`} onClick={() => handleTabChange(EDIT_PASSWORD)}>
                                Change Password
                            </li>

                            <li className={`cardTabItem ${activeTab === History ? "activeTab" : ""}`} onClick={() => handleTabChange(History)}>
                                Reserve History
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
                                        <input type="text" ref={ref} name="first_name" id="firstName" disabled={!enableEdit} onChange={(e) => setProfileFormData({ ...profileFormData, first_name: e.target.value })} />
                                    </div>
                                    <div className="profileInputItem">
                                        <label htmlFor="lastName">Last Name</label>
                                        <input type="text" name="last_name" id="lastName" disabled={!enableEdit} onChange={(e) => setProfileFormData({ ...profileFormData, last_name: e.target.value })} />
                                    </div>
                                    <div className="profileInputItem">
                                        <label htmlFor="email">Email</label>
                                        <input type="text" name="email" id="email" disabled={!enableEdit} onChange={(e) => setProfileFormData({ ...profileFormData, email: e.target.value })} />
                                    </div>
                                    <div className="profileInputItem">
                                        <label htmlFor="Phone">Phone</label>
                                        <input type="text" name="phone" id="Phone" disabled={!enableEdit} onChange={(e) => setProfileFormData({ ...profileFormData, phone: e.target.value })} />
                                    </div>
                                    <div className="profileInputItem">
                                        <label htmlFor="userName">Username</label>
                                        <input type="text" name="username" id="userName" disabled={!enableEdit} onChange={(e) => setProfileFormData({ ...profileFormData, username: e.target.value })} />
                                    </div>
                                    <div className="profileInputItem">
                                        <label htmlFor="userName">Birth Date</label>
                                        <input type="date" name="username" id="userName" disabled={!enableEdit} onChange={(e) => setProfileFormData({ ...profileFormData, birth_date: e.target.value })} />
                                    </div>
                                    <div className="radioProfileContainer">

                                        <label htmlFor="male" className="radioLabel">Male
                                            <input className="profileRadioInput" name="gender" type="radio" value="male" id="male"
                                                disabled={!enableEdit}
                                                onChange={(e) => setProfileFormData({ ...profileFormData, gender: e.target.value })} />
                                            <span className="checkmark"></span>
                                        </label>


                                        <label htmlFor="female" className="radioLabel">Female
                                            <input className="profileRadioInput" name="gender" type="radio" value="female" id="female"
                                                disabled={!enableEdit}
                                                onChange={(e) => setProfileFormData({ ...profileFormData, gender: e.target.value })} />
                                            <span className="checkmark"></span>
                                        </label>

                                    </div>

                                </div>
                                <div className="profileFormBtn">
                                    <button className="profileBtn" onClick={(e) => handleChangeInfo(e)}>Save Changes</button>
                                    <button className="profileBtn" onClick={(e) => handleEdit(e)}>Edit Information</button>
                                </div>
                            </form> : null}
                    {
                        activeTab === EDIT_PASSWORD ?
                            <form className="profileForm">
                                <h5 className="profileFormTitle">Change Password</h5>
                                <div className="profileFormPasswords">
                                    <div className="profilePassItem">
                                        <label htmlFor="oldPassword">Old Password</label>
                                        <input type="password" name="old_password" id="oldPassword"
                                            disabled={!enableEdit}
                                            onChange={(e) => setPasswordFormData({ ...passwordFormData, old_password: e.target.value })} />
                                    </div>
                                    <div className="profilePassItem">
                                        <label htmlFor="newPassword">New Password</label>
                                        <input type="password" name="new_password" id="newPassword"
                                            disabled={!enableEdit}
                                            onChange={(e) => setPasswordFormData({ ...passwordFormData, new_password: e.target.value })} />
                                    </div>
                                    <div className="profilePassItem">
                                        <label htmlFor="confirm_new_password">Confirm New Password</label>
                                        <input type="password" name="confirm_new_password" id="confirm_new_password"
                                            disabled={!enableEdit}
                                            onChange={(e) => setPasswordFormData({ ...passwordFormData, confirm_new_password: e.target.value })} />
                                    </div>
                                </div>
                                <div className="profileFormBtn">
                                    <button className="profileBtn" onClick={(e) => handlePasswordForm(e)}>Save Changes</button>
                                    <button className="profileBtn" onClick={(e) => handleEdit(e)}>Edit Information</button>
                                </div>
                            </form> : null
                    }

                    {
                        activeTab === History ?

                            <div className="profileHistory">
                                <h5 className="profileFormTitle">Reserve History</h5>

                                <div className="innerProfileHistory">
                                    <table className="profileTable">
                                        <thead className="profileTableHeader">
                                            <tr>
                                                <th className="profileTableHeaderCell">Date</th>
                                                <th className="profileTableHeaderCell">No.Room</th>
                                                <th className="profileTableHeaderCell">Room Type</th>
                                                <th className="profileTableHeaderCell">Cost</th>
                                            </tr>
                                        </thead>
                                        <tbody className="profileTableBody">
                                            <tr className="profileTableRow">
                                                <td className="profileTableBodyCell">Wed Oct 12 2022 to Thu Oct 20 2022</td>
                                                <td className="profileTableBodyCell">202</td>
                                                <td className="profileTableBodyCell">Medium Royal</td>
                                                <td className="profileTableBodyCell">$ 184.4</td>
                                            </tr>
                                            <tr className="profileTableRow">
                                                <td className="profileTableBodyCell">Wed Oct 12 2022 to Thu Oct 20 2022</td>
                                                <td className="profileTableBodyCell">202</td>
                                                <td className="profileTableBodyCell">Medium Royal</td>
                                                <td className="profileTableBodyCell">$ 184.4</td>
                                            </tr>
                                            <tr className="profileTableRow">
                                                <td className="profileTableBodyCell">Wed Oct 12 2022 to Thu Oct 20 2022</td>
                                                <td className="profileTableBodyCell">202</td>
                                                <td className="profileTableBodyCell">Medium Royal</td>
                                                <td className="profileTableBodyCell">$ 184.4</td>
                                            </tr>
                                            <tr className="profileTableRow">
                                                <td className="profileTableBodyCell">Wed Oct 12 2022 to Thu Oct 20 2022</td>
                                                <td className="profileTableBodyCell">202</td>
                                                <td className="profileTableBodyCell">Medium Royal</td>
                                                <td className="profileTableBodyCell">$ 184.4</td>
                                            </tr>
                                            <tr className="profileTableRow">
                                                <td className="profileTableBodyCell">Wed Oct 12 2022 to Thu Oct 20 2022</td>
                                                <td className="profileTableBodyCell">202</td>
                                                <td className="profileTableBodyCell">Medium Royal</td>
                                                <td className="profileTableBodyCell">$ 184.4</td>
                                            </tr>
                                            <tr className="profileTableRow">
                                                <td className="profileTableBodyCell">Wed Oct 12 2022 to Thu Oct 20 2022</td>
                                                <td className="profileTableBodyCell">202</td>
                                                <td className="profileTableBodyCell">Medium Royal</td>
                                                <td className="profileTableBodyCell">$ 184.4</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div> :

                            null
                    }
                </div>
            </div>
        </div>
    )
}

export default ProfileMainCard