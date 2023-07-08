import { Link } from "react-router-dom";
import signUpImg from "../../assets/others/authentication2.png";
import FormBtn from "../../components/Form/FormBtn";
import TextInput from "../../components/Form/TextInput";
import "./Register.css";

const Register = () => {
  return (
    <section className='text-gray-400 body-font bg-authBg flex min-h-screen w-full justify-center items-center'>
      <div className='container px-5 py-24 mx-auto '>
        <div className='lg:w-2/6 md:w-1/2 bg-transparent border-2 border-sky-500 bg-opacity-50 rounded-lg md:mx-auto w-full mt-10 md:mt-0 p-10 auth_shadow'>
          <div className='flex flex-col text-center w-full mb-6'>
            <h1 className='sm:text-3xl text-2xl font-medium title-font mb-4 text-lime-700'>
              Sign Up
            </h1>
            <img src={signUpImg} alt='signUp-image' className='w-2/3 mx-auto' />
          </div>
          <div className='flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:px-0 items-end sm:space-x-4 sm:space-y-0 space-y-4'>
            <div className='relative sm:mb-0 flex-grow w-full'>
              <TextInput title='Email' />
              <FormBtn type='submit' title='submit' />
            </div>
          </div>
          <h6 className='text-center text-stone-800 cursor-pointer text-xs mt-3'>
            Already registered? <Link to="/login"> Go to log in</Link>
          </h6>
        </div>
      </div>
    </section>
  );
};

export default Register;
