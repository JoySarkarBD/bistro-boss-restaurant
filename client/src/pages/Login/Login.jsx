import { useFormik } from "formik";
import { useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../Features/auth/authApiSlice";
import { setCredentials } from "../../Features/auth/authSlice";
import signUpImg from "../../assets/others/authentication2.png";
import ErrorMsg from "../../components/Form/ErrorMsg";
import FormBtn from "../../components/Form/FormBtn";
import TextInput from "../../components/Form/TextInput";
import PageTitle from "../../components/Shared/PageTitle";
import { signinSchema } from "../../schema/validation";
import "../Register/Register.css";

const Login = () => {
  const location = useLocation();
  const [login, { isLoading }] = useLoginMutation();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // @desc [if a user reset his password then this useEffect will fire]
  useEffect(() => {
    if (location.state?.isSuccess) {
      toast.success("Password reset successfully");
    }
  }, [location.state?.isSuccess]);

  // initial values
  let initialValues = {
    email: "",
    password: "",
  };

  // login function
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
    validationSchema: signinSchema,
    onSubmit: async (values) => {
      try {
        const { email, password } = values;
        const userData = await login({ email, password }).unwrap();
        if (userData?.msg === "success" && userData?.data?.accessToken) {
          localStorage.setItem(
            "userInfo",
            JSON.stringify(userData?.data?.userInfo)
          );

          //dispatch action [store user stuff]
          dispatch(
            setCredentials({
              accessToken: userData?.data?.accessToken,
              roles: userData?.data?.roles,
              userInfo: userData?.data?.userInfo,
            })
          );
        } else {
          toast.error("Something wrong , please try again later", {
            duration: 2000,
          });
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

  // @desc navigate to homepage if users all stuff is good
  useEffect(() => {
    if (!isLoading && auth.accessToken) {
      navigate("/");
    }
  }, [isLoading, auth.accessToken, navigate]);

  return (
    <>
      <Toaster />
      <PageTitle title='Login' />
      <section className='text-gray-400 body-font bg-authBg flex min-h-screen w-full justify-center items-center'>
        <div className='container px-5 py-24 mx-auto flex flex-wrap items-center'>
          <div className='lg:w-3/5 md:w-3/5 md:pr-16 lg:pr-0 pr-0'>
            <img src={signUpImg} alt='signUp-image' className='w-2/3 mx-auto' />
          </div>
          <form
            onSubmit={handleSubmit}
            className='lg:w-2/5	 md:w-2/5	 bg-transparent border-2 border-indigo-500 bg-opacity-50 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0'>
            <h2 className='text-4xl text-black font-semibold title-font mb-5'>
              Log In
            </h2>
            <div className='relative mb-4'>
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
            </div>
            <div className='relative mb-4'>
              <TextInput
                title='Password'
                type='password'
                name='password'
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && touched.password ? (
                <ErrorMsg subject={errors.password} />
              ) : null}
              <p className='text-left text-[#869CDB] cursor-pointer text-base mt-1'>
                <Link to='/forget-password' className='font-normal'>
                  Forgot Password?
                </Link>
              </p>
            </div>
            <FormBtn type='submit' title='Login' />
            <p className='text-center text-[#D99904] cursor-pointer text-base mt-3'>
              New here?{" "}
              <Link to='/register' className='font-semibold'>
                Create a New Account
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
