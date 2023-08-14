import { useFormik } from "formik";
import { Toaster, toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useUpdatePasswordMutation } from "../../Features/auth/authApiSlice";
import { updatePasswordSchema } from "../../schema/validation";
import ErrorMsg from "./ErrorMsg";
import TextInput from "./TextInput";

const UpdatePasswordForm = () => {
  const auth = useSelector((state) => state.auth);
  const { email } = auth.userInfo;

  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();
  const {
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    setErrors,
    values,
    touched,
  } = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: updatePasswordSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const updatedData = {
          email,
          password: values.password,
          newPassword: values.newPassword,
        };

        const response = await updatePassword(updatedData).unwrap();
        resetForm({ values: "" });
        if (response.msg === "success") {
          toast.success("Password updated successfully");
        } else {
          toast.error("Something wrong , please try again later", {
            duration: 2000,
          });
        }
      } catch (error) {
        const statusCode = [404, 403, 500];
        if (error.status === 400) {
          setErrors(error.data.errors);
        }
        if (statusCode.includes(error?.status)) {
          console.log(error.data.err);
          toast.error(error.data.err, {
            duration: 2000,
          });
        }
      }
    },
  });
  return (
    <>
      {" "}
      <Toaster />
      <div className='bg-white dark:bg-boxDark p-8 rounded-lg shadow-md col-span-2 my-10'>
        <h2 className='dark:border-gray-500 text-2xl border-[#dedede] border-b-2 py-3 font-semibold text-[#344767] dark:text-white mb-8'>
          Update password
        </h2>
        <form onSubmit={handleSubmit}>
          <div className='grid grid-cols-12 gap-x-4'>
            {/*Old Password */}
            <div className='col-span-6'>
              <TextInput
                title='old password *'
                type='password'
                name='password'
                value={values?.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && touched.password ? (
                <ErrorMsg subject={errors.password} />
              ) : null}
            </div>

            {/*New Password */}
            <div className='col-span-6'>
              <TextInput
                title='new password *'
                type='password'
                name='newPassword'
                value={values?.newPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.newPassword && touched.newPassword ? (
                <ErrorMsg subject={errors.newPassword} />
              ) : null}
            </div>

            {/*Confirm Password */}
            <div className='col-span-6'>
              <TextInput
                title='confirm password *'
                type='password'
                name='confirmNewPassword'
                value={values?.confirmNewPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.confirmNewPassword && touched.confirmNewPassword ? (
                <ErrorMsg subject={errors.confirmNewPassword} />
              ) : null}
            </div>

            {/* Update Form Btn */}
            <div className='col-span-12 text-end'>
              <button
                disabled={isLoading}
                type='submit'
                className='bg-indigo-500 hover:bg-indigo-600 text-base text-white font-medium py-2 mt-4 w-1/3 rounded focus:outline-none focus:shadow-outline mx-auto spinner-button'>
                {isLoading ? "Loading..." : "Save Changes"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdatePasswordForm;
