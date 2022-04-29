import React from 'react'
import './FeaturedRooms.css'
import {Carousel} from 'react-bootstrap'
import IMG from '../images/cover2.jpg';


const FeaturedRooms = () => {
    return (
        <section>
            <h3 className="sectionTitle">Featured Rooms</h3>
             {/* <Carousel fade className="carousel" interval={1000}>
                <Carousel.Item className="carouselItem">
                    <img src={IMG} alt="featuredRoom1"/>
                    <Carousel.Caption className="carousel-caption">
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>

                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel> */} 
        </section>
    )
}

export default FeaturedRooms