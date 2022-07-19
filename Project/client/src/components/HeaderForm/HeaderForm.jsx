import React , {useState} from 'react'
import './HeaderForm.css'
import Table from '../Table/Table'
import { useNavigate } from "react-router-dom";

const HeaderForm = ({main}) => {

    const [formData , setFormData] = useState({checkIn : '' , checkOut : '' , rooms: '1' , adults: '1' , children: '0'})
    const navigator = useNavigate();

    const handleForm = (e) => {
        e.preventDefault();
        const urlParms = 
        `?checkIn=${formData.checkIn}&checkOut=${formData.checkOut}&rooms=${formData.rooms}&adults=${formData.adults}&children=${formData.children}`;
        navigator('/bookNow'+ urlParms);
        
    }

    return (
        <form onSubmit={(e) => handleForm(e)} className="formContainer" style={main ? {transform: 'translateY(-100px)'} : null}>
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

            <button className="button">Check Availability</button>
        </form>
    )
}

export default HeaderForm