import React from 'react'
import Navbar from '../Navbar/Navbar'
import './Sign.css'
const Sign = ({ signUp }) => {
    return (
        
        <div className="container">
            {
                signUp ?
                    <div className="box">
                        <h4>Sign Up</h4>
                        <input type="text" className="inputs" placeholder="Username" />
                        <input type="password" className="inputs" placeholder="Password" />
                        <input type="password" className="inputs" placeholder="Confirm Password" />
                        <div className="radioContainer">
                            <input type="radio" className="radio" /> I accept tems and conditions
                        </div>
                        <button className="btn">Sign Up</button>

                        <span>Already have an account? <span>Sign In</span></span>
                    </div>

                    :

                    <div className="box">
                        
                    </div>
            }
        </div>
    )
}

export default Sign