import React, { useState, useEffect, useRef } from 'react'
import IMG from '../images/person1.webp'
import Rating from '@mui/material/Rating';
import { fetchTestimonials } from '../../api/api'
import {AiOutlineLeft , AiOutlineRight} from 'react-icons/ai'
import Box from '@mui/material/Box';
import './Testimonials.css'

const Testimonials = () => {

    const [index, setIndex] = useState(0);
    const [review, setReview] = useState([])
    const ref = useRef();
    var children = ref.current?.children.length - 1;
   /*  console.log(children) */

    const handleRight = () => {
        if (index < children) {
            setIndex(index + 1);
        }

        else if (index === children) {
            setIndex(0);
        }


    }

    const handleLeft = () => {
        /* console.log(children)
        console.log(index); */
        if (index <= children && index > 0) {
            setIndex(index - 1);
        }

        else if (index < 0) {
            setIndex(0);
        }

    }

    const splitToThreeArray = (arr, numberOfItems) => {
        var newArray1 = [], newArray2 = [], newArray3 = [];
        var counter;

        for (let index = 0; index <= 2; index++) {
            counter = 0;
            while (counter <= numberOfItems && arr.length !== 0) {

                switch (index) {
                    case 0:
                        newArray1.push(arr.pop())
                        counter++;
                        break;
                    case 1:
                        newArray2.push(arr.pop())
                        counter++;
                        break;

                    case 2:
                        newArray3.push(arr.pop())
                        counter++;
                        break;

                    default:
                        break;
                }
            }

        }

        return [newArray1, newArray2, newArray3];
    }

    useEffect(() => {
        children = ref.current?.children.length - 1;
        let amount = index * 100 * -1;
        ref.current.style.transform = `translateX(${amount}%)`
        /* console.log(index); */
    }, [index])

    useEffect(() => {
        const getData = async () => {
            const {data} = await fetchTestimonials();
            console.log(data);
            setReview(splitToThreeArray(data, 2))
        }

        getData()

    }, [])

    console.log(review)



    return (
        <section className="testimonialsContainer">
            <div className="testimonialsTitle">
                <h3>Testimonials</h3>
            </div>

            <div className="sliderContainer">
                <div className="innerSlider" ref={ref}>
                    
                        {review.map((reviewList , index) => (
                          reviewList.length !== 0 &&  <div className="testimonials" key={index}>
                                {
                                    reviewList.map(reviewItem => (

                                        <div className="card" key={reviewItem.userId}>
                                            <div className="cardHeader">
                                                <img src={IMG} alt="" className="cardImg" />
                                                <Box className="cardInfo">
                                                    <span className="cardName">{reviewItem.first_name}</span>
                                                    <Rating
                                                        name="simple-controlled"
                                                        className="rating"
                                                        value={reviewItem.rate}
                                                        readOnly
                                                    />
                                                </Box>
                                            </div>
                                            <p className="cardDescription">{reviewItem.review}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
                <AiOutlineRight className="rightIcon" onClick={handleRight}></AiOutlineRight>
                <AiOutlineLeft className="leftIcon"  onClick={handleLeft}></AiOutlineLeft>
            </div>
        </section>
    )
}

export default Testimonials