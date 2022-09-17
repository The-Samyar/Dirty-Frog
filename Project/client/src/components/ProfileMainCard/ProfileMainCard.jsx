import React from 'react'
import './ProfileMainCard.css'

const ProfileMainCard = () => {
    return (
        <div className='profileMainCardContainer'>
            <div className="profileMainCard">
                <div className="ProfileMainInnerCard">
                    <div className="cardTabsContainer">
                        <ul className="cardTabs">
                            <li className="cardTabItem activeTab">
                                Edit Information
                            </li>

                            <li className="cardTabItem">
                                Change Password
                            </li>
                        </ul>
                    </div>

                    <form className="profileForm">
                        <h5 className="profileFormTitle">Profile Information</h5>
                        <div className="profileFormInputs">
                            <div className="profileInputItem">
                                <label htmlFor="firstName">First Name</label>
                                <input type="text" name="first_name" id="firstName" />
                            </div>
                            <div className="profileInputItem">
                                <label htmlFor="lastName">Last Name</label>
                                <input type="text" name="last_name" id="lastName" />
                            </div>
                            <div className="profileInputItem">
                                <label htmlFor="email">Email</label>
                                <input type="text" name="email" id="email" />
                            </div>
                            <div className="profileInputItem">
                                <label htmlFor="Phone">Phone</label>
                                <input type="text" name="phone" id="Phone" />
                            </div>
                            <div className="profileInputItem">
                                <label htmlFor="userName">Username</label>
                                <input type="text" name="username" id="userName" />
                            </div>
                            <div className="profileInputItem">
                                <label htmlFor="firstName">First Name</label>
                                <input type="text" name="first_name" id="firstName" />
                            </div>
                            <div className="profileInputItem">
                                <button className="profileBtn">Save Changes</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ProfileMainCard