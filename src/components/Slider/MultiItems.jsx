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

export default function MultipleItems({ data, count, children }) {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: count,
    slidesToScroll: 3,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
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
