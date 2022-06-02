import React , {useEffect , useState} from 'react'
import './Stats.css'
import {fetchStats} from '../../api/api'
import CountUp from 'react-countup'


const Stats = () => {

    const [data, setData] = useState({})
    const [run, setRun] = useState(false);

    const checkViewPort = () => {
        if (window.scrollY >= 1500) {
            setRun(true);
        }
    }

    window.addEventListener('scroll', checkViewPort);
    
    useEffect(() =>{
        const getData = async () => {
          const {data} = await fetchStats()
          setData(data)
        }
    
        getData();
    } , [])

    const {guests_count , positive_ratings_count , rooms_count , staff_count} = data

    return (
        <section className="statsContainer">
            <div className="countersContainer">
                <div className="counterItem">
                   <CountUp className="counter" separator="," duration={2} end={guests_count} redraw />
                    <span className="counterTitle">No. Of Guests</span>
                </div>
                <div className="counterItem">
                    <CountUp className="counter" separator="," duration={2} end={rooms_count} redraw />
                    <span className="counterTitle">No. Of Rooms</span>
                </div>
                <div className="counterItem">
                    <CountUp className="counter" separator="," duration={2} end={staff_count} redraw />
                    <span className="counterTitle">No. Of Staffs</span>
                </div>
                <div className="counterItem">
                    <CountUp className="counter" separator="," duration={2} end={positive_ratings_count} redraw />
                    <span className="counterTitle">No. Of Positive Rates</span>
                </div>
            </div>
        </section>
    )
}

export default Stats