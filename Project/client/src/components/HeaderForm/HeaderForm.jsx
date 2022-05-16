import React from 'react'
import './HeaderForm.css'

const HeaderForm = () => {

    const handleForm = (e) => {
        e.preventDefault();
    }
    

    return (
        <form onClick={(e) => handleForm(e)} className="formContainer">
            <div className="inputSection">
                <label htmlFor="checkIn">Check In</label>
                <input type="date" id="checkIn" />
            </div>
            <div className="inputSection">
                <label htmlFor="checkOut">Check Out</label>
                <input type="date" name="" id="checkOut" />

            </div>
            <div className="inputSection">
                <label htmlFor="rooms">Rooms</label>
                <select name="" id="rooms">
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
                <select name="" id="adults">
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
                <select name="" id="children">
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