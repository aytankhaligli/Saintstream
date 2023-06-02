import Slider from "react-slick";
import { Streamlist } from "../../data/constants";
import rightArrow from "../../assets/arrow-right.png";

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

export default function MultipleItems() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    nextArrow: <SampleNextArrow />,
  };

  return (
    <div>
      <Slider {...settings}>
        {Streamlist.map((item) => (
          <div key={item.id}>
            <img src={item.image} alt="" />
          </div>
        ))}
      </Slider>
    </div>
  );
}
