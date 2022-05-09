import React, { useState, useEffect, useRef } from 'react'
import './Testimonials.css'

const Testimonials = () => {

    const [index, setIndex] = useState(0);
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
        if (index < children && index > 0) {
            setIndex(index - 1);
            console.log('if')
        }

        else if (index <= 0) {
            setIndex(0);
            console.log('else')
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
                        hello
                    </div>
                    <div className="testimonials">
                        hello2
                    </div>
                </div>
                <i className="fa fa-angle-right rightIcon" onClick={handleRight}></i>
                <i class="fa fa-angle-left leftIcon" onClick={handleLeft}></i>
            </div>
        </section>
    )
}

export default Testimonials