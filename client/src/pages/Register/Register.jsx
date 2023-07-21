import { useState } from "react";
import { Link } from "react-router-dom";
import { useRegistrationMutation } from "../../Features/auth/authApiSlice";
import signUpImg from "../../assets/others/authentication2.png";
import FormBtn from "../../components/Form/FormBtn";
import TextInput from "../../components/Form/TextInput";
import PageTitle from "../../components/Shared/PageTitle";
import "./Register.css";

const Register = () => {
  const [registration, { isError, isLoading, isSuccess }] =
    useRegistrationMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // regest function
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userData = await registration({ email, password }).unwrap();
      console.log(userData);
    } catch (err) {
      console.log(err);
      if (!err?.originalStatus) {
        // isLoading: true until timeout occurs
        console.log("No Server Response");
      } else if (err.originalStatus === 400) {
        console.log("Missing Username or Password");
      } else if (err.originalStatus === 401) {
        console.log("Unauthorized");
      } else {
        console.log("Login Failed");
      }
    }
  };

  return (
    <>
      <PageTitle title='Sign Up' />
      <section className='text-gray-400 body-font bg-authBg flex min-h-screen w-full justify-center items-center'>
        <div className='container px-5 py-24 mx-auto '>
          <div className='lg:w-2/6 md:w-1/2 bg-transparent border-2 border-indigo-500 bg-opacity-50 rounded-lg md:mx-auto w-full mt-10 md:mt-0 p-10 auth_shadow'>
            <div className='flex flex-col text-center w-full mb-6'>
              <h2 className='text-4xl text-black font-semibold title-font mb-5'>
                Sign Up
              </h2>
              <img
                src={signUpImg}
                alt='signUp-image'
                className='w-2/3 mx-auto'
              />
            </div>
            <form
              onSubmit={handleRegister}
              className='flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:px-0 items-end sm:space-x-4 sm:space-y-0 space-y-4'>
              <div className='relative sm:mb-0 flex-grow w-full'>
                <TextInput
                  name='email'
                  title='email'
                  type='text'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextInput
                  name='password'
                  title='password'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <FormBtn type='submit' title='submit' />
              </div>
            </form>
            <h6 className='text-center text-[#D99904] cursor-pointer text-base mt-3'>
              Already registered?{" "}
              <Link to='/login' className='font-semibold'>
                {" "}
                Go to log in
              </Link>
            </h6>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
