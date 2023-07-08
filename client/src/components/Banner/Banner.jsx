import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import img1 from "./../../assets/home/01.jpg";
import img2 from "./../../assets/home/02.jpg";
import img3 from "./../../assets/home/03.jpg";
import { default as img4, default as img5 } from "./../../assets/home/04.jpg";
import img6 from "./../../assets/home/05.jpg";

import "./Banner.css";

const Banner = () => {
  return (
    <div>
      <Carousel autoPlay={true}>
        <div>
          <img src={img1} />
        </div>
        <div>
          <img src={img2} />
        </div>
        <div>
          <img src={img3} />
          <p className="legend">Legend 3</p>
        </div>
        <div>
          <img src={img4} />
        </div>
        <div>
          <img src={img5} />
        </div>
        <div>
          <img src={img6} />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;