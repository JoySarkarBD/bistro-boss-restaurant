/* eslint-disable react/prop-types */
import { AiOutlineCamera } from "react-icons/ai";
import TextInput from "./TextInput";

// eslint-disable-next-line react/prop-types
const UserProfileForm = () => {
  return (
    <div className='bg-white dark:bg-boxDark p-8 rounded-lg shadow-md col-span-2'>
      <h2 className='dark:border-gray-500 text-2xl border-[#dedede] border-b-2 py-3 font-semibold text-[#344767] dark:text-white mb-8'>
        Update Profile
      </h2>
      <form encType='multipart/form-data'>
        <div className='grid grid-cols-12 gap-x-4'>
          {/* Upload Image  */}
          <div className='col-span-12 mb-4'>
            <div className='flex items-start gap-x-4'>
              <div className='relative w-28 h-28 overflow-hidden flex items-center border-2 mb-5 rounded-full'>
                <label
                  htmlFor='image'
                  className='absolute cursor-pointer text-gray-400 right-1 left-1 text-center'>
                  <AiOutlineCamera className='mx-auto text-2xl' />
                </label>
                <input hidden id='image' name='image' type='file' />
              </div>

              <div>
                <p className='text-[22px] font-medium'>Dip</p>
                <p className='text-[15px] font-normal'>Supper Admin</p>
              </div>
            </div>
          </div>

          {/* Name  */}
          <div className='col-span-6'>
            <TextInput title='name' type='text' />
          </div>

          {/* Email */}
          <div className='col-span-6'>
            <TextInput title='email' type='email' />
          </div>

          {/* Password */}
          <div className='col-span-6'>
            <TextInput title='password' type='password' />
          </div>

          {/* Mobile */}
          <div className='col-span-6'>
            <TextInput title='number' type='number' />
          </div>

          {/* Address */}
          <div className='col-span-6'>
            <TextInput title='address' type='text' defaultValue='Sylhet' />
          </div>

          {/* Update Form Btn */}
          <div className='col-span-12 text-end'>
            <button className='bg-indigo-500 hover:bg-indigo-600 text-base text-white font-medium py-2 mt-4 w-1/3 rounded focus:outline-none focus:shadow-outline mx-auto spinner-button'>
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserProfileForm;
