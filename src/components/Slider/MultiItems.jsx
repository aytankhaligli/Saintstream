import Slider from "react-slick";
import rightArrow from "../../assets/images/arrow-right.png";
import styles from "./MultiItems.module.css";
import React from "react";

function SampleNextArrow({ className, onClick }) {
  return (
    <div
      className={className}
      style={{ display: "block", cursor: "pointer" }}
      onClick={onClick}
    >
      <img src={rightArrow} alt="right arrow icon" />
    </div>
  );
}

function SamplePrevArrow({ className, onClick }) {
  return (
    <div className={className} style={{ display: "none", content: "" }}></div>
  );
}

export default function MultipleItems({ data, count, children, isCast }) {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToScroll: 3,
    slidesToShow: count,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: count - 2,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: isCast ? 2 : count - 3,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: isCast ? 2 : count - 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={styles.slide}>
      <Slider {...settings}>
        {data.map((item, index) => (
          <div key={item.id}>
            {React.cloneElement(children, { item, index })}
          </div>
        ))}
      </Slider>
    </div>
  );
}
