import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../../Features/auth/authApiSlice";
import cupcake from "../../assets/others/cupcake-dribbble.gif";
import ErrorMsg from "../../components/Form/ErrorMsg";
import FormBtn from "../../components/Form/FormBtn";
import TextInput from "../../components/Form/TextInput";
import PageTitle from "../../components/Shared/PageTitle";
import { resetPasswordSchema } from "../../schema/validation";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const location = useLocation();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  // load email data into state
  useEffect(() => {
    if (location.state?.email) {
      toast.success("OTP verified successfully", { duration: 3000 });
      setEmail(location.state?.email);
    }
  }, [location.state?.email]);

  // @desc reset password
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
      password: "",
      confirmPassword: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async (values) => {
      try {
        const { password } = values;
        const response = await resetPassword({ password, email }).unwrap();
        if (response.msg === "success") {
          navigate("/login", { state: { isSuccess: true } });
        } else {
          toast.error("Something wrong , please try again later", {
            duration: 2000,
          });
        }
      } catch (error) {
        let errorStatus = [500, 401, 404];
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
      <PageTitle title='Reset Password' />
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
              <form
                className='relative sm:mb-0 flex-grow w-full'
                onSubmit={handleSubmit}>
                <div className='mb-4'>
                  <TextInput
                    title='New password'
                    type='password'
                    name='password'
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password ? (
                    <ErrorMsg subject={errors.password} />
                  ) : null}
                </div>

                <div className='mb-4'>
                  <TextInput
                    title='Confirm password'
                    type='password'
                    name='confirmPassword'
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <ErrorMsg subject={errors.confirmPassword} />
                  ) : null}
                </div>
                <div className='w-full h-full  text-center'>
                  <FormBtn
                    type='submit'
                    title={isLoading ? "Loading..." : "Reset"}
                    disabled={isLoading}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResetPassword;
