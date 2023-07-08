// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import img2 from "./../../assets/home/slide-2.jpg";
import img3 from "./../../assets/home/slide-3.jpg";
import img4 from "./../../assets/home/slide-4.jpg";
import img5 from "./../../assets/home/slide-5.jpg";
import img1 from "./../../assets/home/slide1.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./Categories.css";

// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';

import SingleCategories from "./SingleCategories";

//create slider data
const categoriesSlide = [
  {
    id: 1,
    name: "Salads",
    img: img1,
  },
  {
    id: 2,
    name: "Soups",
    img: img2,
  },
  {
    id: 3,
    name: "Pizzas",
    img: img3,
  },
  {
    id: 4,
    name: "Desserts",
    img: img4,
  },
  {
    id: 5,
    name: "Desserts",
    img: img5,
  },
  {
    id: 1,
    name: "Salads",
    img: img1,
  },
  {
    id: 2,
    name: "Soups",
    img: img2,
  },
  {
    id: 3,
    name: "Pizzas",
    img: img3,
  },
  {
    id: 4,
    name: "Desserts",
    img: img4,
  },
  {
    id: 5,
    name: "Desserts",
    img: img5,
  },
  {
    id: 5,
    name: "Desserts",
    img: img5,
  },
];

const Categories = () => {

  return (
    <section className="my-24">
      <div className='w-10/12 mx-auto'>
        <Swiper
          initialSlide={Math.floor(categoriesSlide.length / 2)}
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          modules={[EffectCoverflow, Pagination]}
          pagination={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 2,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
          }}
        >
          {categoriesSlide.map((category) => {
            return (
              <SwiperSlide key={category.id}>
                <SingleCategories key={category.id} category={category} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section >
  );
};

export default Categories;