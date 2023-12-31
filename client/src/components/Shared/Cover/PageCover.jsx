/* eslint-disable react/prop-types */
import { Parallax } from "react-parallax";

const PageCover = ({ img, title, subText }) => {
  return (
    <Parallax
      blur={{ min: -50, max: 50 }}
      bgImage={img}
      bgImageAlt='the menu'
      strength={500}>
      <div className='hero h-[700px]'>
        <div className='hero-overlay bg-opacity-60'></div>
        <div className='hero-content text-center text-neutral-content'>
          <div className='w-[400px] lg:w-[800px] md:w-[600px] sm:w-[400px] px-10 py-20 bg-black bg-opacity-30'>
            <h1 className='mb-5 text-xl lg:text-5xl md:text-3xl sm:text-xl  font-bold uppercase text-center'>
              {title}
            </h1>
            <p className='mb-5 text-xs  uppercase'>{subText}</p>
          </div>
        </div>
      </div>
    </Parallax>
  );
};

export default PageCover;
