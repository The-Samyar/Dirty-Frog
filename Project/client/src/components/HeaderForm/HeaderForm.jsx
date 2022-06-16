import React , {useState} from 'react'
import './HeaderForm.css'
import { post } from '../../api/api'

const HeaderForm = () => {

    const [formData , setFormData] = useState({checkIn : '' , checkOut : '' , rooms: '1' , adults: '1' , children: '0'})

    const handleForm = (e) => {
        e.preventDefault();
        console.log(formData)
        post(formData)
    }

    return (
        <form onSubmit={(e) => handleForm(e)} className="formContainer">
            <div className="inputSection">
                <label htmlFor="checkIn">Check In</label>
                <input type="date" id="checkIn" onChange={(e) => setFormData({...formData , checkIn :e.target.value})}/>
            </div>
            <div className="inputSection">
                <label htmlFor="checkOut">Check Out</label>
                <input type="date" name="" id="checkOut" onChange={(e) => setFormData({...formData , checkOut :e.target.value})}/>

            </div>
            <div className="inputSection">
                <label htmlFor="rooms">Rooms</label>
                <select name="" id="rooms" onChange={(e) => setFormData({...formData , rooms :e.target.value})}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select>
            </div>

            <div className="inputSection">
                <label htmlFor="adults">Adults</label>
                <select name="" id="adults" onChange={(e) => setFormData({...formData , adults :e.target.value})}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select>
            </div>

            <div className="inputSection">
                <label htmlFor="children">Children</label>
                <select name="" id="children" onChange={(e) => setFormData({...formData , children :e.target.value})}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </select>
            </div>

            <input type="submit" value="Check Availability" className="button"/>
        </form>
    )
}

export default HeaderForm