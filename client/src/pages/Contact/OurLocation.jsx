import { BsPhoneVibrateFill } from "react-icons/bs";
import { FiClock } from "react-icons/fi";
import { HiLocationMarker } from "react-icons/hi";
import SectionTitle from "../../components/Shared/SectionTitle";

const OurLocation = () => {
    return (
        <>
           <section className='my-24'>
        <SectionTitle subheading='---Visit Us---' heading='OUR LOCATION' />
        <section className='body-font'>
          <div className='container px-5 py-10 mx-auto'>
            <div className='flex flex-wrap -m-4 text-center'>
              <div className='p-4 md:w-1/3 sm:w-1/2 w-full'>
                <div className='border-2 border-["#E8E8E8"]  rounded-lg'>
                  <div className='bg-[#D1A054] w-full px-4 py-6 flex justify-center items-center'>
                    <BsPhoneVibrateFill className='text-4xl text-white' />
                  </div>
                  <div className='flex flex-col justify-center items-center mb-4 bg-[#F3F3F3] w-11/12 mx-auto h-48'>
                    <h2 className='title-font font-medium text-3xl '>2.7K</h2>
                    <p className='leading-relaxed pt-3'>+38 (012) 34 56 789</p>
                  </div>
                </div>
              </div>
              <div className='p-4 md:w-1/3 sm:w-1/2 w-full'>
                <div className='border-2 border-["#E8E8E8"]  rounded-lg'>
                  <div className='bg-[#D1A054] w-full px-4 py-6 flex justify-center items-center'>
                    <HiLocationMarker className='text-4xl text-white' />
                  </div>
                  <div className='flex flex-col justify-center items-center mb-4 bg-[#F3F3F3] w-11/12 mx-auto h-48'>
                    <h2 className='title-font font-medium text-3xl '>
                      ADDRESS
                    </h2>
                    <p className='leading-relaxed pt-3'>+38 (012) 34 56 789</p>
                  </div>
                </div>
              </div>
              <div className='p-4 md:w-1/3 sm:w-1/2 w-full'>
                <div className='border-2 border-["#E8E8E8"]  rounded-lg'>
                  <div className='bg-[#D1A054] w-full px-4 py-6 flex justify-center items-center'>
                    <FiClock className='text-4xl text-white' />
                  </div>
                  <div className='flex flex-col justify-center items-center mb-4 bg-[#F3F3F3] w-11/12 mx-auto h-48'>
                    <h2 className='title-font font-medium text-3xl '>
                      WORKING HOURS
                    </h2>
                    <p className='leading-relaxed pt-3'>
                      Mon - Fri: 08:00 - 22:00 <br /> Sat - Sun: 10:00 - 23:00
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section> 
        </>
    );
};

export default OurLocation;