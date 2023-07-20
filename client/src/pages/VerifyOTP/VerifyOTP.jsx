import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import cupcake from "../../assets/others/cupcake-dribbble.gif";
import FormBtn from "../../components/Form/FormBtn";
import TextInput from "../../components/Form/TextInput";
import PageTitle from "../../components/Shared/PageTitle";

const VerifyOTP = () => {
  const [email, setEmail] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state.status === "success" && location.state.data.email) {
      setEmail(location.state.data.email);
      toast.success(`OTP was send to your ${location.state.data.email} email.`);
    }
  }, [location.state.status, location.state.data.email]);

  const verifiedOTP = () => {};

  // @desc resend otp
  const resendOtp = () => {
    console.log(email);
  };

  return (
    <div>
      <Toaster />
      <PageTitle title='OTP Verify' />
      <section className='text-gray-400 body-font  flex min-h-screen w-full justify-center items-center'>
        <div className='container px-5 py-24 mx-auto '>
          <div className='lg:w-2/6 md:w-1/2 bg-transparent border-2 border-indigo-500 bg-opacity-50 rounded-lg md:mx-auto w-full mt-10 md:mt-0 p-10 auth_shadow'>
            <div className='flex flex-col text-center w-full mb-6'>
              <h2 className='text-4xl text-black font-semibold title-font mb-5'>
                Verify OTP
              </h2>
              <img
                src={cupcake}
                alt='signUp-image'
                className='w-2/3 mx-auto h-[200px]'
              />
            </div>
            <div className='flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:px-0 items-end sm:space-x-4 sm:space-y-0 space-y-4'>
              <div className='relative sm:mb-0 flex-grow w-full'>
                <TextInput title='otp' type='' />
                <FormBtn
                  type='button'
                  title='verify OTP'
                  onClick={verifiedOTP}
                />
                <input type='hidden' name='email' defaultValue={email} />
                <FormBtn type='button' title='Resend' onClick={resendOtp} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VerifyOTP;