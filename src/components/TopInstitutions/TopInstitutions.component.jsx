import React, { Fragment, useState, useEffect } from 'react';
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
            setState({
                ...state,
                slidesToShow: 1
            })
        } else {
            setState({
                ...state,
                slidesToShow: 3
            })
        }
    }, [])
    let settings = {
        dots: true,
        autoplay: true,
        infinite: true,
        speed: 1000,
        pauseOnDotsHover: true,
        slidesToShow: state.slidesToShow,
        slidesToScroll: 1
      };
    return (
        <Fragment>
            <h4 className="mt-5">Top Performing institutions</h4>
            <div className="top-institutions-container mt-2">
                <Slider {...settings}>
                    <div>
                        <h5>Name</h5>
                        <h6>Value</h6>
                    </div>
                    <div>
                        <h5>Name</h5>
                        <h6>Value</h6>
                    </div>
                    <div>
                        <h5>Name</h5>
                        <h6>Value</h6>
                    </div>
                    <div>
                        <h5>Name</h5>
                        <h6>Value</h6>
                    </div>
                    <div>
                        <h5>Name</h5>
                        <h6>Value</h6>
                    </div>
                    <div>
                        <h5>Name</h5>
                        <h6>Value</h6>
                    </div>
                </Slider>
        </div>
      </Fragment>
    )
}
