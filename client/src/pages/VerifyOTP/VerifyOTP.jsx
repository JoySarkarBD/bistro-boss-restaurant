import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

import { fromatTime } from "../../../lib/timeFormator";
import { useVerifyOtpMutation } from "../../Features/auth/authApiSlice";
import cupcake from "../../assets/others/cupcake-dribbble.gif";
import FormBtn from "../../components/Form/FormBtn";
import TextInput from "../../components/Form/TextInput";
import PageTitle from "../../components/Shared/PageTitle";

const VerifyOTP = () => {
  const [counter, setCounter] = useState(300);
  const [otp, setOtp] = useState("");
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [email, setEmail] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  //  @desc  [set email in state for otp verification && notification]
  useEffect(() => {
    if (location.state.status === "success" && location.state.data.email) {
      setEmail(location.state.data.email);
      toast.success(
        `OTP was send to your ${location.state.data.email} email.`,
        { duration: 5000 }
      );
    }
  }, [location.state.status, location.state.data.email]);

  // count down here
  useEffect(() => {
    // set timer
    let timer =
      counter > 0 &&
      setInterval(() => {
        setCounter(counter - 1);
      }, 1000);

    // clear timer
    return () => clearInterval(timer);
  }, [counter]);

  const verifiedOTP = async () => {
    try {
      const response = await verifyOtp({ otp, email }).unwrap();
      if (response.status === "success" && response?.data.status) {
        navigate("/reset-password", { state: { email: response?.data.email } });
      }
    } catch (error) {
      if (error.status === 400) {
        return toast.error(error.data.errors[0].otp, { duration: 2000 });
      }
      if (error.status === 401) {
        return toast.error("Unauthorized user", { duration: 2000 });
      }
      if (error.status === 403 && error.data.data === "OTP already used") {
        return toast.error(error.data.data, { duration: 2000 });
      }
      if (error.status === 403 && error.data.data === "OTP Expired") {
        return toast.error(error.data.data, { duration: 2000 });
      }
    }
  };

  // @desc resend otp
  const resendOtp = () => {
    setCounter(10);
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
            <form className='flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:px-0 items-end sm:space-x-4 sm:space-y-0 space-y-4'>
              <div className='relative sm:mb-0 flex-grow w-full'>
                <h4>{fromatTime(counter)}</h4>
                <TextInput
                  // title='otp'
                  name='otp'
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                  placeholder='Enter OTP...'
                />
                {/* <input type="text" value={otp} onChange={(e)=> setOtp(e.target.value)} /> */}
                <div className='w-full h-full  text-center'>
                  <FormBtn
                    type='button'
                    title='verify OTP'
                    onClick={verifiedOTP}
                    disabled={isLoading}
                  />
                </div>
                <div className='w-full h-full  text-center'>
                  <FormBtn
                    type='button'
                    title='Resend'
                    onClick={resendOtp}
                    disabled={counter}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VerifyOTP;
