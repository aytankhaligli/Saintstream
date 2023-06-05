import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Movies } from "../../data/constants";
import React from "react";

export default function SimpleSlider({
  children,
  hasArrow,
  autoplay,
  initialSlide,
}) {
  const settings = {
    arrows: hasArrow,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: initialSlide,
    autoplay: autoplay,
  };

  return (
    <div>
      <Slider {...settings}>
        {Movies.map((movie) => (
          <div key={movie.id}>{React.cloneElement(children, { movie })}</div>
        ))}
      </Slider>
    </div>
  );
}
