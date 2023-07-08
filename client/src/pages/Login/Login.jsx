import { Link } from "react-router-dom";
import signUpImg from "../../assets/others/authentication2.png";
import FormBtn from "../../components/Form/FormBtn";
import TextInput from "../../components/Form/TextInput";
import "../Register/Register.css";

const Login = () => {
  return (
    <section className='text-gray-400 body-font bg-authBg flex min-h-screen w-full justify-center items-center'>
      <div className='container px-5 py-24 mx-auto flex flex-wrap items-center'>
        <div className='lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0'>
          <img src={signUpImg} alt='signUp-image' className='w-2/3 mx-auto' />
        </div>
        <div className='lg:w-2/6 md:w-1/2 bg-transparent border-2 border-sky-500 bg-opacity-50 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0'>
          <h2 className='text-lime-700 text-lg font-medium title-font mb-5 '>
            Log In
          </h2>
          <div className='relative mb-4'>
            <TextInput title='Email' />
          </div>
          <div className='relative mb-4'>
            <TextInput title='Password' />
          </div>
          <FormBtn type='submit' title='submit' />
          <p className='text-center text-stone-800 cursor-pointer text-xs mt-3'>
            New here? <Link to="/register">Create a New Account</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
