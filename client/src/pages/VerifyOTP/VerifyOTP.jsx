import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import { fromatTime } from "../../../lib/timeFormator";
import {
  useOtpMutation,
  useVerifyOtpMutation,
} from "../../Features/auth/authApiSlice";
import cupcake from "../../assets/others/cupcake-dribbble.gif";
import ErrorMsg from "../../components/Form/ErrorMsg";
import FormBtn from "../../components/Form/FormBtn";
import TextInput from "../../components/Form/TextInput";
import PageTitle from "../../components/Shared/PageTitle";
import { otpSchema } from "../../schema/validation";

const VerifyOTP = () => {
  const [counter, setCounter] = useState(300);
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [otp, { isLoading: loading }] = useOtpMutation();
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

  //  @desc verify otp
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    errors,
    setErrors,
  } = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: otpSchema,
    onSubmit: async (values) => {
      try {
        const { otp } = values;
        const response = await verifyOtp({ otp, email }).unwrap();
        if (response.status === "success" && response?.data.status) {
          navigate("/reset-password", {
            state: { email: response?.data.email },
          });
        } else {
          toast.error("Something wrong , please try again later", {
            duration: 2000,
          });
        }
      } catch (error) {
        let errorStatus = [403, 401, 404];
        if (error.status === 400) {
          setErrors(error?.data?.errors);
        }
        if (errorStatus.includes(error.status)) {
          toast.error(error.data.err, { duration: 2000 });
        }
      }
    },
  });

  // @desc resend otp
  const resendOtp = async () => {
    setCounter(300);
    try {
      const otpData = await otp({ email }).unwrap();
      if (otpData.status === "success" && otpData?.data?.email) {
        toast.success("OTP send successfully", {
          duration: 3000,
        });
      } else {
        toast.error("Something wrong , please try again later", {
          duration: 2000,
        });
      }
    } catch (error) {
      let errorStatus = [404, 401, 500];
      if (error.status === 400) {
        setErrors(error?.data?.errors);
      }
      if (errorStatus.includes(error.status)) {
        toast.error(error.data.err, { duration: 2000 });
      }
    }
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
            <form
              className='flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:px-0 items-end sm:space-x-4 sm:space-y-0 space-y-4'
              onSubmit={handleSubmit}>
              <div className='relative sm:mb-0 flex-grow w-full'>
                <h4>{fromatTime(counter)}</h4>
                <TextInput
                  name='otp'
                  value={values.otp}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder='Enter OTP...'
                />
                {errors.otp && touched.otp ? (
                  <ErrorMsg subject={errors.otp} />
                ) : null}
                <div className='w-full h-full  text-center'>
                  <FormBtn
                    title={isLoading ? "Loading..." : "Verify OTP"}
                    type='submit'
                    disabled={isLoading}
                  />
                </div>
                <div className='w-full h-full  text-center'>
                  <FormBtn
                    type='button'
                    title={loading ? "Loading..." : "Resend"}
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
