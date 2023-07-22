import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useOtpMutation } from "../../Features/auth/authApiSlice";
import cupcake from "../../assets/others/cupcake-dribbble.gif";
import ErrorMsg from "../../components/Form/ErrorMsg";
import FormBtn from "../../components/Form/FormBtn";
import TextInput from "../../components/Form/TextInput";
import PageTitle from "../../components/Shared/PageTitle";
import { forgetPasswordSchema } from "../../schema/validation";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [otp, { isLoading }] = useOtpMutation();

  // @desc verify otp func
  /* const handleVerifyOtp = async () => {
    toast.success("OTP sending", { duration: 3000 });
    try {
      const otpData = await otp({ email }).unwrap();
      if (otpData.status === "success" && otpData?.data?.email) {
        navigate("/verify-otp", { state: otpData });
      }
    } catch (error) {
      if (error.status === 400 && error.data.msg === "failed") {
        return toast.error(error.data.errors[0].email);
      }
      if (error.status === 401) {
        return toast.error("Unauthorized user");
      }
    }
  };
 */

  //
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
      email: "",
    },
    validationSchema: forgetPasswordSchema,
    onSubmit: async (values) => {
      try {
        const { email } = values;
        const otpData = await otp({ email }).unwrap();
        if (otpData.status === "success" && otpData?.data?.email) {
          navigate("/verify-otp", { state: otpData });
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
    },
  });

  return (
    <div>
      <Toaster />
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
              <form
                className='relative sm:mb-0 flex-grow w-full'
                onSubmit={handleSubmit}>
                <TextInput
                  title='Email'
                  type='email'
                  name='email'
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email ? (
                  <ErrorMsg subject={errors.email} />
                ) : null}
                <FormBtn type='submit' title='OTP send' disabled={isLoading} />
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForgetPassword;
