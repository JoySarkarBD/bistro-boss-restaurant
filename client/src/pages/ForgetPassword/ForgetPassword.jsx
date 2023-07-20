import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useOtpMutation } from "../../Features/auth/authApiSlice";
import cupcake from "../../assets/others/cupcake-dribbble.gif";
import FormBtn from "../../components/Form/FormBtn";
import TextInput from "../../components/Form/TextInput";
import PageTitle from "../../components/Shared/PageTitle";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const notify = () => toast.success("OTP send in your email!");
  const [email, setEmail] = useState("developer.mehedi23@gmail.com");
  const [otp] = useOtpMutation();

  // @desc verify otp func
  const handleVerifyOtp = async () => {
    try {
      const otpData = await otp({ email }).unwrap();
      if (otpData.status === "success" && otpData?.data?.email) {
        navigate("/verify-otp", { state: otpData });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <PageTitle title='Forget Password' />
      <section className='text-gray-400 body-font  flex min-h-screen w-full justify-center items-center'>
        <div className='container px-5 py-24 mx-auto '>
          <div className='lg:w-2/6 md:w-1/2 bg-transparent border-2 border-indigo-500 bg-opacity-50 rounded-lg md:mx-auto w-full mt-10 md:mt-0 p-10 auth_shadow'>
            <div className='flex flex-col text-center w-full mb-6'>
              <h2 className='text-4xl text-black font-semibold title-font mb-5'>
                Forget Password
              </h2>
              <img
                src={cupcake}
                alt='signUp-image'
                className='w-2/3 mx-auto h-[200px]'
              />
            </div>
            <div className='flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:px-0 items-end sm:space-x-4 sm:space-y-0 space-y-4'>
              <div className='relative sm:mb-0 flex-grow w-full'>
                <TextInput
                  title='Email'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FormBtn
                  type='submit'
                  title='OTP send'
                  onClick={handleVerifyOtp}
                />
                <Toaster />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForgetPassword;
