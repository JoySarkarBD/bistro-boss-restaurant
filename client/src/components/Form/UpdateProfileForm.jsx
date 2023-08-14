/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import { useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useUpdateProfileMutation } from "../../Features/auth/authApiSlice";
import PreviewImg from "../../ui/PreviewImg";
import TextInput from "./TextInput";

// eslint-disable-next-line react/prop-types
const UserProfileForm = () => {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [preview, setPreview] = useState(null);

  const auth = useSelector((state) => state.auth);
  const { email, name, phone, address } = auth.userInfo;
  const { roles } = auth;

  //  @desc set role
  let role;
  if (roles.length === 2 && roles.includes(440)) {
    role = "Admin";
  } else {
    role = "Customer";
  }

  const initialValues = {
    name,
    email,
    phone,
    address,
    avatar: null,
  };

  const { values, setFieldValue, handleSubmit, handleChange, errors, touched } =
    useFormik({
      initialValues,
      // validationSchema: avatarSchema,
      onSubmit: async (values, { setSubmitting }) => {
        try {
          // return console.log(preview);
          const updatedData = {
            data: {
              ...values,
              avatar: preview,
            },
            userId: auth?.userInfo?.userId,
          };
          // return console.log(JSON.stringify(updatedData.data));
          // return console.log(updatedData);
          const res = await updateProfile(updatedData).unwrap();
          console.log(res);
        } catch (error) {
          console.log(error);
        } finally {
          setSubmitting(false);
        }
      },
    });

  return (
    <div className='bg-white dark:bg-boxDark p-8 rounded-lg shadow-md col-span-2'>
      <h2 className='dark:border-gray-500 text-2xl border-[#dedede] border-b-2 py-3 font-semibold text-[#344767] dark:text-white mb-8'>
        Update Profile
      </h2>
      <form encType='multipart/form-data' onSubmit={handleSubmit}>
        <div className='grid grid-cols-12 gap-x-4'>
          {/* Upload Image  */}
          <div className='col-span-12 mb-4'>
            <div className='flex items-start gap-x-4'>
              <div className='relative w-28 h-28 overflow-hidden flex items-center border-2 mb-5 rounded-full'>
                <label
                  htmlFor='avatar'
                  className='absolute cursor-pointer text-gray-400 right-1 left-1 text-center'>
                  <AiOutlineCamera className='mx-auto text-2xl' />
                </label>
                <input
                  hidden
                  id='avatar'
                  name='avatar'
                  onChange={(e) => setFieldValue("avatar", e.target.files[0])}
                  type='file'
                />
                {values?.avatar && !errors.avatar && (
                  <PreviewImg
                    props={{ file: values.avatar, preview, setPreview }}
                  />
                )}
                {touched.avatar && errors.avatar && (
                  <p className='text-red-600 text-xs mt-1'>{errors.avatar}</p>
                )}
              </div>

              <div>
                <p className='text-[22px] font-medium'>{name}</p>
                <p className='text-[15px] font-normal'>{role}</p>
              </div>
            </div>
          </div>

          {/* Name  */}
          <div className='col-span-6'>
            <TextInput
              title='name'
              type='text'
              name='name'
              value={values.name}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div className='col-span-6'>
            <TextInput
              title='email'
              type='email'
              defaultValue={values.email}
              readOnly
            />
          </div>

          {/* Mobile */}
          <div className='col-span-6'>
            <TextInput
              title='phone'
              type='text'
              name='phone'
              value={values.phone || ""}
              onChange={handleChange}
            />
          </div>

          {/* Address */}
          <div className='col-span-6'>
            <TextInput
              title='address'
              type='text'
              name='address'
              value={values.address || ""}
              onChange={handleChange}
            />
          </div>

          {/* Update Form Btn */}
          <div className='col-span-12 text-end gap-2'>
            <Link to='/dashboard/profile'>
              <button className='bg-red-700 hover:bg-red-600 text-base text-white font-medium py-2 mt-4 w-1/3 rounded focus:outline-none focus:shadow-outline mx-auto spinner-button me-2'>
                Cancel
              </button>
            </Link>
            <button
              type='submit'
              className='bg-indigo-500 hover:bg-indigo-600 text-base text-white font-medium py-2 mt-4 w-1/3 rounded focus:outline-none focus:shadow-outline mx-auto spinner-button'>
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserProfileForm;
