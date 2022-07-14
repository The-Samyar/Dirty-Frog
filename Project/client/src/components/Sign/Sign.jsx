import React, { useRef, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { Link } from 'react-router-dom'
import {sendSignUpData , sendSignInData} from '../../api/api'
import './Sign.css'
const Sign = ({ signUp }) => {

    const [SignData, setSignData] = useState({ username: '', password: '', confirmPassword: '', check: '' })
    const [loginData, setLoginData] = useState({ username: '', password: '' })

    var isInputEmpty = true;

    const usernameRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const checkRef = useRef();
    const errorRef = useRef();

    const handleSignUpForm = (e) => {
        isInputEmpty = false;
        e.preventDefault();
      
        if (SignData.username === '') {
            usernameRef.current.style.border = '2px solid red'
            isInputEmpty = true;
        }

        if (SignData.password === '') {
            passwordRef.current.style.border = '2px solid red'
            isInputEmpty = true;
        }

        if (SignData.confirmPassword === '') {
            confirmPasswordRef.current.style.border = '2px solid red'
            isInputEmpty = true;
        }

        if (SignData.check === '') {
            checkRef.current.textContent = 'You have to check this'
            checkRef.current.style.color = 'red'
            isInputEmpty = true;
        }

        if(isInputEmpty){
            errorRef.current.textContent = 'Some of your inputs are empty';
            errorRef.current.style.color = 'red';
        }else{ 
            console.log(SignData)
        }

    }

    const handleSignInForm = (e) => {
        isInputEmpty = false;
        e.preventDefault();
      
        if (loginData.username === '') {
            usernameRef.current.style.border = '2px solid red';
            isInputEmpty = true;
        }

        if (loginData.password === '') {
            passwordRef.current.style.border = '2px solid red';
            isInputEmpty = true;
        }

        if(isInputEmpty){
            errorRef.current.textContent = 'Some of your inputs are empty';
            errorRef.current.style.color = 'red';
        }else{ 
            console.log(loginData)
        }
    }

    return (

        <form className="container">
            <Navbar />

            <div className="innerContainer">
                {
                    signUp ?
                        <div className="box">
                            <h4>Sign Up</h4>
                            <span ref={errorRef}></span>
                            <input type="text"
                                className="inputs"
                                placeholder="Username"
                                onChange={(e) => setSignData({ ...SignData, username: e.target.value })}
                                ref={usernameRef}
                                onFocus={()=>{ usernameRef.current.style.border = '2px solid rgba(27, 27, 48, 0.726)'; errorRef.current.textContent = ''}}
                            />

                            <input type="password"
                                className="inputs"
                                placeholder="Password"
                                onChange={(e) => setSignData({ ...SignData, password: e.target.value })}
                                ref={passwordRef}
                                onFocus={()=> {passwordRef.current.style.border = '2px solid rgba(27, 27, 48, 0.726)'; errorRef.current.textContent = ''}}
                            />

                            <input type="password"
                                className="inputs"
                                placeholder="Confirm Password"
                                onChange={(e) => setSignData({ ...SignData, confirmPassword: e.target.value })}
                                ref={confirmPasswordRef}
                                onFocus={()=> {confirmPasswordRef.current.style.border = '2px solid rgba(27, 27, 48, 0.726)'; errorRef.current.textContent = ''}}
                            />

                            <div className="radioContainer">
                                <input type="radio"
                                    id="radio"
                                    className="radio"
                                    onChange={() => {setSignData({ ...SignData, check: true }); checkRef.current.textContent = ''; errorRef.current.textContent = ''}} 
                                    />
                                    
                                <label htmlFor="radio">
                                    I accept tems and conditions
                                </label>
                            </div>
                            <span ref={checkRef}>

                            </span>

                            <button className="btn"
                                onClick={(e) => handleSignUpForm(e)}>Sign Up</button>

                            <span>Already have an account? <Link to="/signIn">Sign In</Link></span>
                        </div>

                        :

                        <div className="box">
                            <h4>Sign In</h4>
                            <span ref={errorRef}></span>
                            <input type="text"
                                className="inputs"
                                placeholder="Username"
                                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                                ref={usernameRef}
                                onFocus={() => {usernameRef.current.style.border = '2px solid rgba(27, 27, 48, 0.726)'; errorRef.current.textContent = ''}}
                            />

                            <input type="password"
                                className="inputs"
                                placeholder="Password"
                                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                ref={passwordRef}
                                onFocus={() => {passwordRef.current.style.border = '2px solid rgba(27, 27, 48, 0.726)'; errorRef.current.textContent = ''}}
                            />
                            <button className="btn"
                                onClick={(e) => handleSignInForm(e)}>
                                Sign In
                            </button>

                            <span>Don't you have an account? <Link to="/signUp">Sign Up</Link></span>
                        </div>
                }
            </div>
        </form>
    )
}

export default Sign