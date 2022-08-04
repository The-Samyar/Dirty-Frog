import React from 'react'
import './RoomDetails.css'

const RoomDetails = ({description}) => {
    return (
        <section className="contianer">
            <div className="overview">
                <h3 className="titleDetails">Room Overview</h3>
                <p className="overviewDetail">
                    {description}
                </p>
            </div>

            <div className="houseRules">
                <h3 className="titleDetails">House Rules</h3>
                <div className="rule">
                    <div className="ruleContainer">
                        <h4 className="ruleTitle">
                            Check-In
                        </h4>
                        <p className="ruleDetail">
                            14:00 - 22:00
                        </p>
                    </div>
                </div>

                <div className="rule">
                    <div className="ruleContainer">
                        <h4 className="ruleTitle">
                            Check-out
                        </h4>
                        <p className="ruleDetail">
                            14:00 - 22:00
                        </p>
                    </div>
                </div>

                <div className="rule">
                    <div className="ruleContainer">
                        <h4 className="ruleTitle">
                            Luggage storage
                        </h4>
                        <p className="ruleDetail">
                            14:00 - 22:00
                        </p>
                    </div>
                </div>

                <div className="rule">
                    <div className="ruleContainer">
                        <h4 className="ruleTitle">
                            Cancellation/prepayment
                        </h4>
                        <p className="ruleDetail">
                            Cancellation and prepayment policies vary according to room type.
                            Please enter the dates of your stay and check the conditions of your required room.
                        </p>
                    </div>
                </div>

                <div className="rule">
                    <div className="ruleContainer">
                        <h4 className="ruleTitle">
                            Children and extra beds
                        </h4>
                        <ul className="ruleDetailList">
                            <li>All children are welcome.</li>
                            <li>One child under 6 years is charged EUR 50 per night when using existing beds.</li>
                            <li>There is no capacity for extra beds in the room.</li>
                            <li>Supplements are not calculated automatically in the total costs and will have to be
                                paid for separately during your stay.
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="rule">
                    <div className="ruleContainer">
                        <h4 className="ruleTitle">
                            Pets
                        </h4>
                        <p className="ruleDetail">
                            Pets are not allowed.
                        </p>
                    </div>
                </div>

                <div className="rule">
                    <div className="ruleContainer">
                        <h4 className="ruleTitle">
                            Additional info
                        </h4>
                        <ul className="ruleDetailList">
                            <li>Please note that the restaurant is closed each Sunday.</li>
                            <li>The restaurant will also be closed during Christmas (25-26 December)</li>
                            <li>Please note that parking spaces cannot be reserved or guaranteed</li>
                            <li>
                                For a group booking more than 5 rooms up to 4 weeks prior to arrival
                                cancellation is 100% free of charge, within 2 until 4 weeks 50% free
                                of charge, and within 2 weeks the property will charge you in full.
                                Please note that Ozo hotel always charges city tax prior to your arrival
                                with the non-refundable rate or group booking
                            </li>
                            <li>
                                Please note that the credit card that is used for the booking needs to be
                                present at check-in. When this credit card is not available please bring a photocopy
                                of the credit card with authorization of the owner
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default RoomDetails