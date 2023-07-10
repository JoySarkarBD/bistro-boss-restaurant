/* eslint-disable react/prop-types */
import { Parallax } from "react-parallax";

const HomeCover = ({ img, title, desc }) => {
  return (
    <Parallax
      blur={{ min: -50, max: 50 }}
      bgImage={img}
      bgImageAlt='the menu'
      strength={500}>
      <div className='container'>
        <div className='hero lg:h-[522px]'>
          <div className='hero-content text-center'>
            <div className='lg:w-9/12 px-10 py-20 bg-white'>
              <h2 className='mb-8 uppercase lg:text-[70px] text-4xl font-bold'>
                {title}
              </h2>
              <p className='text-[1rem] font-semibold'>{desc}</p>
            </div>
          </div>
        </div>
      </div>
    </Parallax>
  );
};

export default HomeCover;
