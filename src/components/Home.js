import React, { Component, useState } from "react";
import Carousel from "react-bootstrap/Carousel";

export default class Home extends Component {
  render() {
    // const settings = {
    //   speed: 500,
    //   width: '100%',
    //   height: '50px'
    // }
    return (
      <div>
        <Carousel interval='700'>
          <Carousel.Item>
            <img
              className="d-block w-100 h-50"
              src={process.env.PUBLIC_URL + "/images/image1.jpg"}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3 color="black">Posture 1 </h3>
              <p>Yin Yoga</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 h-50"
              src={process.env.PUBLIC_URL + "/images/img2.jpg"}
              alt="Second slide"
            />

            <Carousel.Caption>
            <h3>Posture 2 </h3>
            <p>Yin Yoga</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 h-50"
              src={process.env.PUBLIC_URL + "/images/img6.jpg"}
              alt="Third slide"
            />

            <Carousel.Caption>
            <h3>Posture 3 </h3>
            <p>Slow Flow</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 h-50"
              src={process.env.PUBLIC_URL + "/images/img4.jpg"}
              alt="Fourth slide"
            />

            <Carousel.Caption>
            <h3>Posture 4 </h3>
            <p>Hatha Yoga</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 h-50"
              src={process.env.PUBLIC_URL + "/images/img5.jpg"}
              alt="Fifth slide"
            />

            <Carousel.Caption>
            <h3>Posture 5 </h3>
            <p>Yoga</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }
}
