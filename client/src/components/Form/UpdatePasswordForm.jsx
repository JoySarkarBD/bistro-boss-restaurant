import TextInput from "./TextInput";

const UpdatePasswordForm = () => {
  return (
    <div className='bg-white dark:bg-boxDark p-8 rounded-lg shadow-md col-span-2 my-10'>
      <h2 className='dark:border-gray-500 text-2xl border-[#dedede] border-b-2 py-3 font-semibold text-[#344767] dark:text-white mb-8'>
        Profile Details
      </h2>
      <form encType='multipart/form-data'>
        <div className='grid grid-cols-12 gap-x-4'>
          {/*Old Password */}
          <div className='col-span-6'>
            <TextInput title='old password *' type='password' />
          </div>

          {/*New Password */}
          <div className='col-span-6'>
            <TextInput title='new password *' type='password' />
          </div>

          {/*Confirm Password */}
          <div className='col-span-6'>
            <TextInput title='confirm password *' type='password' />
          </div>

          {/* Update Form Btn */}
          <div className='col-span-12 text-end'>
            <button className='bg-indigo-500 hover:bg-indigo-600 text-base text-white font-medium py-2 mt-4 w-1/3 rounded focus:outline-none focus:shadow-outline mx-auto spinner-button'>
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdatePasswordForm;
