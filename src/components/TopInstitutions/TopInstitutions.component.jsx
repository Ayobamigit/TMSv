import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import './TopInstitutions.styles.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function TopInstitutions() {
    const [state, setState] = useState({
        slidesToShow: 0
    })
    useEffect(() => {
        if(window.innerWidth < 960){
            setState(state => ({
                ...state,
                slidesToShow: 1
            }))
        } else {
            setState(state => ({
                ...state,
                slidesToShow: 3
            }))
        }
    }, [])
    let settings = {
        dots: false,
        autoplay: true,
        infinite: true,
        speed: 1000,
        pauseOnDotsHover: true,
        slidesToShow: state.slidesToShow,
        slidesToScroll: 1
      };
    return (
        <div>
            <h4 className="mt-5">Top Performing institutions</h4>
            <div className="page-content top-institutions-container mt-2">
                <Slider {...settings}>
                    <div>
                        <p>Name</p>
                        <h5>N100,000</h5>
                    </div>
                    <div>
                        <p>Name</p>
                        <h5>N100,000</h5>
                    </div>
                    <div>
                        <p>Name</p>
                        <h5>N100,000</h5>
                    </div>
                    <div>
                        <p>Name</p>
                        <h5>N100,000</h5>
                    </div>
                    <div>
                        <p>Name</p>
                        <h5>N100,000</h5>
                    </div>
                    <div>
                        <p>Name</p>
                        <h5>N100,000</h5>
                    </div>
                </Slider>
        </div>
      </div>
    )
}
