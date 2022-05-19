import React from 'react'
import './Stats.css'
import CountUp from 'react-countup'

const Stats = () => {

    return (
        <section className="statsContainer">
            <div className="countersContainer">
                <div className="counterItem">
                    <CountUp className="counter" separator="," duration={2} end={39000} redraw />
                    <span className="counterTitle">No. Of Guests</span>
                </div>
                <div className="counterItem">
                    <CountUp className="counter" separator="," duration={2} end={320} redraw />
                    <span className="counterTitle">No. Of Rooms</span>
                </div>
                <div className="counterItem">
                    <CountUp className="counter" separator="," duration={2} end={1000} redraw />
                    <span className="counterTitle">No. Of Staffs</span>
                </div>
                <div className="counterItem">
                    <CountUp className="counter" separator="," duration={2} end={27000} redraw />
                    <span className="counterTitle">No. Of Positive Rates</span>
                </div>
            </div>
        </section>
    )
}

export default Stats