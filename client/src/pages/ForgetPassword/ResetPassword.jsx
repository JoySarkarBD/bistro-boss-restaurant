import cupcake from "../../assets/others/cupcake-dribbble.gif";
import FormBtn from "../../components/Form/FormBtn";
import TextInput from "../../components/Form/TextInput";
import PageTitle from "../../components/Shared/PageTitle";

const ResetPassword = () => {
  return (
    <div>
      <PageTitle title='Sign Up' />
      <section className='text-gray-400 body-font  flex min-h-screen w-full justify-center items-center'>
        <div className='container px-5 py-14 mx-auto '>
          <div className='lg:w-2/6 md:w-1/2 bg-transparent border-2 border-indigo-500 bg-opacity-50 rounded-lg md:mx-auto w-full mt-6 md:mt-0 py-6 auth_shadow'>
            <div className='flex flex-col text-center w-full mb-6'>
              <h2 className='text-4xl text-black font-semibold title-font mb-5'>
                Reset Password
              </h2>
              <img
                src={cupcake}
                alt='signUp-image'
                className='w-2/3 mx-auto h-[200px]'
              />
            </div>
            <div className='flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:px-0 items-end sm:space-x-4 sm:space-y-0 space-y-4'>
              <div className='relative sm:mb-0 flex-grow w-full'>
                <div className='mb-4'>
                  <TextInput title='New password' type='password' />
                </div>
                <div className='mb-4'>
                  <TextInput title='Confirm password' type='password' />
                </div>
                <FormBtn type='submit' title='confirm' />
              </div>
            </div>
          </div>
        </div>
        s
      </section>
    </div>
  );
};

export default ResetPassword;
