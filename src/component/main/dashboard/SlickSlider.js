import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box } from "@mui/material";
import MFAUMGrowth from "./InvestmentTabs/MFAUMGrowth";
import MFSIPBook from "./InvestmentTabs/MFSIPBook";
import TotalAUM from "./InvestmentTabs/TotalAUM";
import ActiveSIP from "./InvestmentTabs/ActiveSIP";
import { useMenu } from "../MenuManagement/MenuContext";

const SlickSlider = ({ isPerformanceActive }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderRef = useRef(null);

    const { menuData } = useMenu();

    const findMenuItem = (name, data) => {
        for (let item of data) {
            if (item.name === name) return item;
            if (item.children) {
                const found = findMenuItem(name, item.children);
                if (found) return found;
            }
        }
        return null;
    };

    const isMFAUMActive = findMenuItem("MF AUM Growth", menuData)?.active;
    const isTotalAUM = findMenuItem("Total AUM", menuData)?.active;
    const isMFSIPBook = findMenuItem("MF SIP Book", menuData)?.active;
    const isActiveSIP = findMenuItem("Total Active SIP", menuData)?.active;

    const slides = [
        ...(isMFAUMActive ? [<MFAUMGrowth key="mfAUMActive" />] : []),
        ...(isTotalAUM ? [<TotalAUM key="totalAUM" />] : []),
        ...(isMFSIPBook ? [<MFSIPBook key="sipBook" />] : []),
        ...(isActiveSIP ? [<ActiveSIP key="activeSIP" />] : [])
    ];

    const totalSlides = React.Children.count(slides);

    useEffect(() => {
        const slides = document.querySelectorAll(".slick-slide");
        slides.forEach((slide) => {
            slide.classList.add("!px-[10px]");
        });

        const slidesHeight = document.querySelectorAll(".slick-slide > div");
        let maxHeight = 0;

        slidesHeight.forEach(slide => {
            slide.style.height = "auto"; // reset
            if (slide.offsetHeight > maxHeight) maxHeight = slide.offsetHeight;
        });

        slidesHeight.forEach(slide => {
            slide.style.height = `${maxHeight}px`;
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
            className={`absolute right-[-20px] top-1/2 transform -translate-y-1/2 bg-white text-gray-700 p-3 rounded-l-[20px] shadow-lg hover:bg-gray-200 z-10 h-[140px] 
                ${Math.round(currentSlide) >= totalSlides - 1 ? "hidden" : "block"}`} // Hide Next on last slide
            onClick={onClick}
        >
            <i className="fas fa-chevron-right text-xl"></i>
        </button>
    );

    const slidesToShow = slides.length === 1 ? 1 : isPerformanceActive ? 1.2 : 2.2;

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
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
        <Box className="w-[calc(100%)] mx-auto">
            <Slider ref={sliderRef} {...settings}>
                {slides.map((slide, index) => (
                    <div key={index}>{slide}</div>
                ))}
            </Slider>
        </Box>
    );
};

export default SlickSlider;