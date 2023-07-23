import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useRegistrationMutation } from "../../Features/auth/authApiSlice";
import ErrorMsg from "../../components/Form/ErrorMsg";
import FormBtn from "../../components/Form/FormBtn";
import TextInput from "../../components/Form/TextInput";
import PageTitle from "../../components/Shared/PageTitle";
import { signupSchema } from "../../schema/validation";
import "./Register.css";

const Register = () => {
  const [registration, { isLoading }] = useRegistrationMutation();

  // initial values
  let initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  // regest function
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    errors,
    setErrors,
  } = useFormik({
    initialValues,
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      try {
        const { name, email, password } = values;
        const response = await registration({ name, email, password }).unwrap();
        if (response.msg === "success") {
          toast.success(response.data, { duration: 2000 });
        }
      } catch (error) {
        let errorStatus = [404, 403];
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
    <>
      <Toaster />
      <PageTitle title='Sign Up' />
      <section className='text-gray-600 body-font relative h-screen bg-authBg flex items-center'>
        <div className='container px-5 py-16 mx-auto'>
          <div className='flex flex-col text-center w-full mb-5'>
            <h2 className='text-4xl text-black font-semibold title-font'>
              Sign Up
            </h2>
          </div>
          <div className='lg:w-1/2 md:w-2/3 mx-auto'>
            <form className='flex flex-wrap  -m-2' onSubmit={handleSubmit}>
              <div className='p-2 w-1/2'>
                <div className='relative'>
                  <TextInput
                    name='name'
                    title='name'
                    type='text'
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.name && touched.name ? (
                    <ErrorMsg subject={errors.name} />
                  ) : null}
                </div>
              </div>
              <div className='p-2 w-1/2'>
                <div className='relative'>
                  <TextInput
                    name='email'
                    title='email'
                    type='text'
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email ? (
                    <ErrorMsg subject={errors.email} />
                  ) : null}
                </div>
              </div>
              <div className='p-2 w-1/2'>
                <div className='relative'>
                  <TextInput
                    name='password'
                    title='password'
                    type='password'
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password ? (
                    <ErrorMsg subject={errors.password} />
                  ) : null}
                </div>
              </div>
              <div className='p-2 w-1/2'>
                <div className='relative'>
                  <TextInput
                    name='confirmPassword'
                    title='confirm password'
                    type='password'
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <ErrorMsg subject={errors.confirmPassword} />
                  ) : null}
                </div>
              </div>

              <FormBtn
                type='submit'
                disabled={isLoading}
                title={isLoading ? "Loading..." : "Registration"}
              />
            </form>

            <p className='text-center text-[#D99904] cursor-pointer text-base mt-3'>
              Have an Account?{" "}
              <Link to='/login' className='font-semibold'>
                Please Login
              </Link>
            </p>
            <div className='p-2 w-full pt-4 mt-4 border-t border-gray-200 text-center'>
              <a className='text-indigo-500'>
                bristo_boss_restaurant@email.com
              </a>
              <p className='leading-normal my-3'>
                Copyright © 2023 - All right reserved by bristo_boss_restaurant
              </p>
              <span className='inline-flex'>
                <a className='text-gray-500 cursor-pointer'>
                  <svg
                    fill='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='w-5 h-5'
                    viewBox='0 0 24 24'>
                    <path d='M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z'></path>
                  </svg>
                </a>
                <a className='ml-4 text-gray-500 cursor-pointer'>
                  <svg
                    fill='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='w-5 h-5'
                    viewBox='0 0 24 24'>
                    <path d='M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z'></path>
                  </svg>
                </a>
                <a className='ml-4 text-gray-500 cursor-pointer'>
                  <svg
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='w-5 h-5'
                    viewBox='0 0 24 24'>
                    <rect
                      width='20'
                      height='20'
                      x='2'
                      y='2'
                      rx='5'
                      ry='5'></rect>
                    <path d='M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01'></path>
                  </svg>
                </a>
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
