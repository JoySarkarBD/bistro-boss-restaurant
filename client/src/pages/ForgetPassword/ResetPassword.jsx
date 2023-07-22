import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../../Features/auth/authApiSlice";
import cupcake from "../../assets/others/cupcake-dribbble.gif";
import FormBtn from "../../components/Form/FormBtn";
import TextInput from "../../components/Form/TextInput";
import PageTitle from "../../components/Shared/PageTitle";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
  const handleResetPassword = async () => {
    try {
      if (password !== confirmPassword) {
        return toast.error("Password does not match");
      } else {
        const response = await resetPassword({ password, email }).unwrap();
        if (response.msg === "success") {
          navigate("/login", { state: { isSuccess: true } });
        }
      }
    } catch (error) {
      if (error.status === 400) {
        return toast.error(error.data.errors[0].password);
      }
      if (error.status === 401) {
        return toast.error("Unauthorized user");
      }
      if (error.status === 500) {
        return toast.error("'Internal server error'");
      }
    }
  };

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
              <form className='relative sm:mb-0 flex-grow w-full'>
                <div className='mb-4'>
                  <TextInput
                    title='New password'
                    type='password'
                    name='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>

                <div className='mb-4'>
                  <TextInput
                    title='Confirm password'
                    type='password'
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className='w-full h-full  text-center'>
                  <FormBtn
                    type='submit'
                    title='confirm'
                    disabled={isLoading}
                    onClick={handleResetPassword}
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
