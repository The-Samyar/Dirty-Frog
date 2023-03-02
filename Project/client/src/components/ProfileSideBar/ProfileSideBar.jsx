import './ProfileSideBar.css'
import { AiOutlinePaperClip } from 'react-icons/ai'
import { sendProfileImage } from '../../api/api';


const ProfileSideBar = ({profileInfo}) => {

    const handleSendingImage = async(e) => {
        const formData = new FormData();
        formData.append('file', e.target.files[0]);

        const {data} = await sendProfileImage(formData);
        console.log(data);
    }

    return (
        <div className='profileSideBarContainer'>
            <div className="profileSideBarCard">
                <div className="innerProfileCard">
                    <div className="profileImgContainer">
                        <img src="../images/person1.webp" alt="profileImg" />
                    </div>

                    <div className="profileInfo">
                        <h6 className="profileUserName">{profileInfo?.username}</h6>
                        <div className="profileName">
                            <span className="Name">{profileInfo?.first_name}</span>
                            <span className="Name">{profileInfo?.last_name}</span>
                        </div>

                        <div className="furtherInfo">
                            <span className="email">{profileInfo?.email}</span>
                            <span className="Phone">{profileInfo?.phone_number}</span>
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

                        <input id="file-input" type="file" onChange={(e) => handleSendingImage(e)} />
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