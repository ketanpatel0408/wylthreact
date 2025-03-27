import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box } from "@mui/material";
import MFAUMGrowth from "./SlickSlider/MFAUMGrowth";
import MFSIPBook from "./SlickSlider/MFSIPBook";

const SlickSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderRef = useRef(null);

    const totalSlides = React.Children.count([
        <MFAUMGrowth />,
        <MFSIPBook />
    ]);

    useEffect(() => {
        const slides = document.querySelectorAll(".slick-slide");
        slides.forEach((slide) => {
            slide.classList.add("!px-[10px]");
        });
    }, []);

    const applySlidePadding = () => {
        setTimeout(() => {
            const slides = document.querySelectorAll(".slick-slide");
            slides.forEach((slide) => {
                slide.classList.add("!px-[10px]");
            });
        }, 50);
    };

    const PrevArrow = ({ onClick }) => (
        <button
            className={`absolute left-[-15px] top-1/2 transform -translate-y-1/2 bg-white text-gray-700 p-3 rounded-r-[20px] shadow-lg hover:bg-gray-200 z-10 h-[140px] 
                ${Math.round(currentSlide) === 0 ? "hidden" : "block"}`}
            onClick={onClick}
        >
            <i className="fas fa-chevron-left text-xl"></i>
        </button>
    );

    const NextArrow = ({ onClick }) => (
        <button
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-gray-700 p-3 rounded-l-[20px] shadow-lg hover:bg-gray-200 z-10 h-[140px] 
                ${Math.round(currentSlide) >= totalSlides - 1 ? "hidden" : "block"}`} // Hide Next on last slide
            onClick={onClick}
        >
            <i className="fas fa-chevron-right text-xl"></i>
        </button>
    );

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1.2,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        rtl: true,
        afterChange: (current) => setCurrentSlide(current),
        beforeChange: () => applySlidePadding(),
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 1.3 }
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 1.1 }
            },
            {
                breakpoint: 480,
                settings: { slidesToShow: 1 }
            }
        ]
    };

    return (
        <Box className="w-[calc(100%+20px)] mx-auto">
            <Slider ref={sliderRef} {...settings}>
                <MFAUMGrowth />
                <MFSIPBook />
            </Slider>
        </Box>
    );
};

export default SlickSlider;