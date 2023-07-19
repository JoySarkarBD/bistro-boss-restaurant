/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import FormBtn from "./FormBtn";
import TextInput from "./TextInput";

// eslint-disable-next-line react/prop-types
const UpdateProfileForm = ({ userData }) => {
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    setEmail(userData?.email);
  }, [userData?.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInfo = {
      name,
      email,
      address,
      password,
    };

    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/v1/update-user/${userData?._id}`,
        userInfo
      );

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form encType='multipart/form-data' onSubmit={handleSubmit}>
        <div className='grid grid-cols-6 gap-y-3 gap-x-6'>
          {/* name */}
          <div className='col-span-3 mb-2'>
            <TextInput
              title='Name'
              type='text'
              id='name'
              name='name'
              placeholder='Type your name'
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* email */}
          <div className='col-span-3 mb-2'>
            <TextInput
              title='Email'
              type='email'
              id='email'
              name='email'
              defaultValue={email}
              readOnly={email ? true : false}
              placeholder='Enter your email'
            />
          </div>

          {/* address */}
          <div className='col-span-3 mb-2'>
            <TextInput
              title='address'
              type='text'
              id='address'
              name='address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder='Enter your address'
            />
          </div>

          {/* password */}
          <div className='col-span-3 mb-2 relative'>
            <TextInput
              title='Password'
              type='password'
              id='password'
              name='password'
              placeholder='Choose a password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/*confirm password */}
          <div className='col-span-3 mb-2'>
            <TextInput
              title='Confirm Password'
              type='text'
              id='confirmPassword '
              name='confirmPassword'
              placeholder='Enter confirm password'
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <div className='form-control mt-2'>
          <label className='label justify-start gap-x-3 cursor-pointer'>
            <input type='checkbox' className='checkbox rounded checkbox-sm' />
            <span className='label-text font-medium'>
              Accept Terms & Condition
            </span>
          </label>
        </div>
        <div>
          <FormBtn
            title='Update'
            type='submit'
            disabled={!(name && password && confirmPassword) && true}
          />
          <Toaster />
        </div>
        {/* <p className="mt-2 font-medium">
          <Link to="/termsCondition">Accept Terms & Condition</Link>
        </p> */}
      </form>
    </div>
  );
};

export default UpdateProfileForm;
