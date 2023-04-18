import React, { useState, useEffect, useRef } from 'react'
import { addReviewToUser, ChangeUserData, getReservationHistory, sendChangePassData } from '../../api/api'
import { AiFillCloseCircle } from 'react-icons/ai'
import Rating from '@mui/material/Rating'
import './ProfileMainCard.css'

const ProfileMainCard = ({ profileInfo }) => {

    const EDIT_PROFILE = 'Edit Profile'
    const EDIT_PASSWORD = 'Edit Password'
    const History = 'Reserve History'

    const [activeTab, setActiveTab] = useState(EDIT_PROFILE);
    const [enableEdit, setEnableEdit] = useState(false);
    const [history, setHistory] = useState(null);
    const [activeReview, setActiveReview] = useState({ rating: 0, review: '' });
    const [review, setReview] = useState({ rating: 0, review: '' });
    const ref = useRef();
    const [profileFormData, setProfileFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        username: '',
        gender: '',
        dob: '',
    })

    const [passwordFormData, setPasswordFormData] = useState({
        old_password: '',
        new_password: '',
        confirm_new_password: '',
    })

    useEffect(() => {
        setProfileFormData({
            first_name: profileInfo?.first_name,
            last_name: profileInfo?.last_name,
            email: profileInfo?.email,
            phone_number: profileInfo?.phone_number,
            username: profileInfo?.username,
            gender: profileInfo?.gender,
            dob: profileInfo?.dob,
        })
    }, [profileInfo])

    useEffect(() => {

        const getHistoryData = async () => {
            if (activeTab === History) {
                const { data } = await getReservationHistory();
                setHistory(data);
            }
        }

        getHistoryData();
    }, [activeTab])

    const closeAddReview = (e) => {

        if (e.target.className === "overlay" || (e.target.localName === "path" || e.target.localName === "svg")) {
            setActiveReview({ rating: 0, review: '' });
            setReview({ review: '', rating: 0 });
        }
    }

    const handleEdit = (e) => {
        e.preventDefault();
        setEnableEdit(true)
        ref.current.focus();
    }

    const handleTabChange = (tab) => {

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

    const handleChangeInfo = async (e) => {
        e.preventDefault();
        await ChangeUserData(profileFormData);
    }

    const handlePasswordForm = async (e) => {
        e.preventDefault();

        if (passwordFormData.new_password === passwordFormData.confirm_new_password) {
            await sendChangePassData(passwordFormData);
        }
    }

    const sendReview = async (e) => {
        await addReviewToUser({ ...review, bookingId: activeReview?.booking_id });
    }

    console.log(activeReview?.rating);
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
                                        <input type="text" defaultValue={profileInfo?.first_name} ref={ref} name="first_name" id="firstName" disabled={!enableEdit} onChange={(e) => setProfileFormData({ ...profileFormData, first_name: e.target.value })} />
                                    </div>
                                    <div className="profileInputItem">
                                        <label htmlFor="lastName">Last Name</label>
                                        <input type="text" defaultValue={profileInfo?.last_name} name="last_name" id="lastName" disabled={!enableEdit} onChange={(e) => setProfileFormData({ ...profileFormData, last_name: e.target.value })} />
                                    </div>
                                    <div className="profileInputItem">
                                        <label htmlFor="email">Email</label>
                                        <input type="text" defaultValue={profileInfo?.email} name="email" id="email" disabled={!enableEdit} onChange={(e) => setProfileFormData({ ...profileFormData, email: e.target.value })} />
                                    </div>
                                    <div className="profileInputItem">
                                        <label htmlFor="Phone">Phone</label>
                                        <input type="text" defaultValue={profileInfo?.phone_number} name="phone" id="Phone" disabled={!enableEdit} onChange={(e) => setProfileFormData({ ...profileFormData, phone_number: e.target.value })} />
                                    </div>
                                    <div className="profileInputItem">
                                        <label htmlFor="userName">Username</label>
                                        <input type="text" defaultValue={profileInfo?.username} name="username" id="userName" disabled={!enableEdit} onChange={(e) => setProfileFormData({ ...profileFormData, username: e.target.value })} />
                                    </div>
                                    <div className="profileInputItem">
                                        <label htmlFor="userName">Birth Date</label>
                                        <input type="date" name="username" defaultValue={profileInfo?.dob} id="userName" disabled={!enableEdit} onChange={(e) => setProfileFormData({ ...profileFormData, dob: e.target.value })} />
                                    </div>
                                    <div className="radioProfileContainer">

                                        <label htmlFor="male" className="radioLabel">Male
                                            <input className="profileRadioInput" name="gender" type="radio" value="male" id="male"
                                                disabled={!enableEdit}
                                                onChange={(e) => setProfileFormData({ ...profileFormData, gender: e.target.value })}
                                                defaultChecked={profileInfo?.gender === "male" ? true : null} />
                                            <span className="checkmark"></span>
                                        </label>


                                        <label htmlFor="female" className="radioLabel">Female
                                            <input className="profileRadioInput" name="gender" type="radio" value="female" id="female"
                                                disabled={!enableEdit}
                                                onChange={(e) => setProfileFormData({ ...profileFormData, gender: e.target.value })}
                                                defaultChecked={profileInfo?.gender === "female" ? true : null} />
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

                            <div className="profileHistory" >
                                <h5 className="profileFormTitle">Reserve History</h5>

                                <div className="innerProfileHistory">
                                    <table className="profileTable" >
                                        <thead className="profileTableHeader">
                                            <tr>
                                                <th className="profileTableHeaderCell">Booking Id</th>
                                                <th className="profileTableHeaderCell">Date</th>
                                                <th className="profileTableHeaderCell">Room(s)</th>
                                                <th className="profileTableHeaderCell">Cost</th>
                                                <th className="profileTableHeaderCell">Review</th>
                                            </tr>
                                        </thead>
                                        <tbody className="profileTableBody" >
                                            {
                                                history?.map(singleHistory =>
                                                    <tr className="profileTableRow">
                                                        <td className="profileTableBodyCell" >{singleHistory.booking_id}</td>
                                                        <td className="profileTableBodyCell" >{singleHistory.date}</td>
                                                        <td className="profileTableBodyCell" >{singleHistory.rooms.map(room => <><span>{room.room}</span><br /></>)}</td>
                                                        <td className="profileTableBodyCell" >$ {singleHistory.cost}</td>
                                                        <td className="profileTableBodyCell" > <button className="addReviewBtn" onClick={() => setActiveReview(singleHistory)}>{singleHistory?.review ? 'Preview' : 'Add Review'}</button></td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>

                                    <div className="overlay" style={activeReview?.booking_id ? { display: 'initial' } : { display: 'none' }} onClick={(e) => closeAddReview(e)}>
                                        <div className="addReviewCard" >
                                            <div className="addReviewCardContainer">
                                                <div className="addReviewCardHeader">
                                                    <h4 className="addReviewTitle">Write a review</h4>
                                                    <div className="addReviewCardCloseIcon">
                                                        <AiFillCloseCircle style={{ width: '100%', height: '100%' }} onClick={(e) => closeAddReview(e)} />
                                                    </div>
                                                </div>

                                                <div className="addReviewContent">
                                                    <div className="addReviewInputContainer">
                                                        <label htmlFor="rating" className="addReviewLabel">Rating</label>
                                                        <Rating id="rating" className="ratingComp" readOnly={activeReview?.review ? true : false} value={activeReview?.rating ? activeReview.rating : review.rating} onChange={(e) => setReview({ ...review, rating: e.target.value })}></Rating>
                                                    </div>

                                                    <div className="addReviewTextContainer">
                                                        <label htmlFor="review" className="addReviewLabel">Review</label>
                                                        <textarea name="review" id="review" className="addReviewTextarea" disabled={activeReview?.review ? true : false} value={activeReview?.review && activeReview.review} onChange={(e) => setReview({ ...review, review: e.target.value })}></textarea>
                                                    </div>
                                                </div>

                                                {
                                                    activeReview?.review ? null : <div className="addReviewCardFooter">
                                                        <button className="addReviewBtn" onClick={(e) => sendReview(e)}>Send</button>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
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