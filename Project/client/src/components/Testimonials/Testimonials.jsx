import React, { useState, useEffect, useRef } from 'react'
import IMG from '../images/person1.jpg'
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import './Testimonials.css'

const Testimonials = () => {

    const [index, setIndex] = useState(0);
    const [value, setValue] = useState(2);
    const ref = useRef();
    var children = ref.current?.children.length - 1;

    const handleRight = () => {
        if (index < children) {
            setIndex(index + 1);
        }

        else if (index === children) {
            setIndex(0);
        }


    }

    const handleLeft = () => {
        console.log(children)
        console.log(index);
        if (index <= children && index > 0) {
            setIndex(index - 1);
        }

        else if (index < 0) {
            setIndex(0);
        }

    }

    useEffect(() => {
        children = ref.current?.children.length - 1;
        let amount = index * 100 * -1;
        ref.current.style.transform = `translateX(${amount}%)`
        console.log(index);
    }, [index])



    return (
        <section className="testimonialsContainer">
            <div className="testimonialsTitle">
                <h3>Testimonials</h3>
            </div>

            <div className="sliderContainer">
                <div className="innerSlider" ref={ref}>
                    <div className="testimonials">
                        <div className="card">
                            <div className="cardHeader">
                                <img src={IMG} alt="" className="cardImg" />
                                <Box className="cardInfo">
                                    <span className="cardName">Kean Walker</span>
                                    <Rating
                                        name="simple-controlled"
                                        className="rating"
                                        value={value}
                                        className="rating"
                                        onChange={(event, newValue) => {
                                            setValue(newValue);
                                        }}
                                    />
                                </Box>
                            </div>
                            <p className="cardDescription">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia,
                                there live the blind texts.</p>
                        </div>
                        <div className="card">
                            <div className="cardHeader">
                                <img src={IMG} alt="" className="cardImg" />
                                <Box className="cardInfo">
                                    <span className="cardName">Kean Walker</span>
                                    <Rating
                                        name="simple-controlled"
                                        className="rating"
                                        value={value}
                                        className="rating"
                                        onChange={(event, newValue) => {
                                            setValue(newValue);
                                        }}
                                    />
                                </Box>
                            </div>
                            <p className="cardDescription">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia,
                                there live the blind texts.</p>
                        </div>
                        <div className="card">
                            <div className="cardHeader">
                                <img src={IMG} alt="" className="cardImg" />
                                <Box className="cardInfo">
                                    <span className="cardName">Kean Walker</span>
                                    <Rating
                                        name="simple-controlled"
                                        className="rating"
                                        value={value}
                                        className="rating"
                                        onChange={(event, newValue) => {
                                            setValue(newValue);
                                        }}
                                    />
                                </Box>
                            </div>
                            <p className="cardDescription">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia,
                                there live the blind texts.</p>
                        </div>
                    </div>
                    <div className="testimonials">
                        <div className="card">
                            <div className="cardHeader">
                                <img src={IMG} alt="" className="cardImg" />
                                <Box className="cardInfo">
                                    <span className="cardName">Kean Walker</span>
                                    <Rating
                                        name="simple-controlled"
                                        className="rating"
                                        value={value}
                                        className="rating"
                                        onChange={(event, newValue) => {
                                            setValue(newValue);
                                        }}
                                    />
                                </Box>
                            </div>
                            <p className="cardDescription">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia,
                                there live the blind texts.</p>
                        </div>
                        <div className="card">
                            <div className="cardHeader">
                                <img src={IMG} alt="" className="cardImg" />
                                <Box className="cardInfo">
                                    <span className="cardName">Kean Walker</span>
                                    <Rating
                                        name="simple-controlled"
                                        className="rating"
                                        value={value}
                                        className="rating"
                                        onChange={(event, newValue) => {
                                            setValue(newValue);
                                        }}
                                    />
                                </Box>
                            </div>
                            <p className="cardDescription">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia,
                                there live the blind texts.</p>
                        </div>
                        <div className="card">
                            <div className="cardHeader">
                                <img src={IMG} alt="" className="cardImg" />
                                <Box className="cardInfo">
                                    <span className="cardName">Kean Walker</span>
                                    <Rating
                                        name="simple-controlled"
                                        className="rating"
                                        value={value}
                                        className="rating"
                                        onChange={(event, newValue) => {
                                            setValue(newValue);
                                        }}
                                    />
                                </Box>
                            </div>
                            <p className="cardDescription">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia,
                                there live the blind texts.</p>
                        </div>
                    </div>
                    <div className="testimonials">
                        <div className="card">
                            <div className="cardHeader">
                                <img src={IMG} alt="" className="cardImg" />
                                <Box className="cardInfo">
                                    <span className="cardName">Kean Walker</span>
                                    <Rating
                                        name="simple-controlled"
                                        className="rating"
                                        value={value}
                                        className="rating"
                                        onChange={(event, newValue) => {
                                            setValue(newValue);
                                        }}
                                    />
                                </Box>
                            </div>
                            <p className="cardDescription">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia,
                                there live the blind texts.</p>
                        </div>
                        <div className="card">
                            <div className="cardHeader">
                                <img src={IMG} alt="" className="cardImg" />
                                <Box className="cardInfo">
                                    <span className="cardName">Kean Walker</span>
                                    <Rating
                                        name="simple-controlled"
                                        className="rating"
                                        value={value}
                                        className="rating"
                                        onChange={(event, newValue) => {
                                            setValue(newValue);
                                        }}
                                    />
                                </Box>
                            </div>
                            <p className="cardDescription">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia,
                                there live the blind texts.</p>
                        </div>
                        <div className="card">
                            <div className="cardHeader">
                                <img src={IMG} alt="" className="cardImg" />
                                <Box className="cardInfo">
                                    <span className="cardName">Kean Walker</span>
                                    <Rating
                                        name="simple-controlled"
                                        className="rating"
                                        value={value}
                                        className="rating"
                                        onChange={(event, newValue) => {
                                            setValue(newValue);
                                        }}
                                    />
                                </Box>
                            </div>
                            <p className="cardDescription">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia,
                                there live the blind texts.</p>
                        </div>
                    </div>
                </div>
                <i className="fa fa-angle-right rightIcon" onClick={handleRight}></i>
                <i class="fa fa-angle-left leftIcon" onClick={handleLeft}></i>
            </div>
        </section>
    )
}

export default Testimonials