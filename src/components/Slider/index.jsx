import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Hero from "../Hero";
import { Movies } from "../../data/constants";

export default function SimpleSlider() {
  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
  };

  return (
    <div>
      <Slider {...settings}>
        {Movies.map((movie) => (
          <Hero
            key={movie.id}
            description={movie.desription}
            season={movie.season}
            image={movie.image}
            title={movie.name}
            releaseDate={movie.year}
            category={movie.catagory}
            time={movie.time}
          />
        ))}
      </Slider>
    </div>
  );
}
