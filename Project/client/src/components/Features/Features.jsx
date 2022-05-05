import React , {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBus , faArrowUp } from "@fortawesome/free-solid-svg-icons";
import 'font-awesome/css/font-awesome.min.css';
import './Features.css'

export const Features = () => {

    const [visibility , setVisibility] = useState(false);

    const checkScroll = () => {
        if (window.scrollY >= 500 && !visibility) {
            setVisibility(true);
        } else if (window.scrollY < 500 && visibility) {
            setVisibility(false);
        }
    }

    const scrollToTop = () => {
        window.scrollTo({behavior: 'smooth' , top: 0});
    }

    window.addEventListener('scroll', checkScroll);



    return (
        <section>
            <h3 className="sectionTitle">Hotel Facilities</h3>
            <div className="featuresContainer">
                <div className="featureItem">
                    <FontAwesomeIcon icon={faBus} className="featureIcon" />
                    <h4 className="featureTitle">Transportation</h4>
                    <p className="featureDescription">
                        Transportation for our hotel is valuable because we want our guests feel comfortable here,
                        so we have 24-hour transportation service for them to catch their plane
                    </p>
                </div>
                <div className="featureItem">
                    <FontAwesomeIcon icon={faBus} className="featureIcon" />
                    <h4 className="featureTitle">Transportation</h4>
                    <p className="featureDescription">
                        Transportation for our hotel is valuable because we want our guests feel comfortable here,
                        so we have 24-hour transportation service for them to catch their plane
                    </p>
                </div>
                <div className="featureItem">
                    <FontAwesomeIcon icon={faBus} className="featureIcon" />
                    <h4 className="featureTitle">Transportation</h4>
                    <p className="featureDescription">
                        Transportation for our hotel is valuable because we want our guests feel comfortable here,
                        so we have 24-hour transportation service for them to catch their plane
                    </p>
                </div>
                <div className="featureItem">
                    <FontAwesomeIcon icon={faBus} className="featureIcon" />
                    <h4 className="featureTitle">Transportation</h4>
                    <p className="featureDescription">
                        Transportation for our hotel is valuable because we want our guests feel comfortable here,
                        so we have 24-hour transportation service for them to catch their plane
                    </p>
                </div>
            </div>
            <FontAwesomeIcon icon={faArrowUp} className="toTopIcon" onClick={scrollToTop} style={{display: visibility ? 'block' : 'none'}}/>
        </section>
    )
}