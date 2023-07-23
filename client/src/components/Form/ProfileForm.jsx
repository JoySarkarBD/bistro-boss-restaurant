/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import avatar from "./../../assets/userImg.png";
import TextInput from "./TextInput";

// eslint-disable-next-line react/prop-types
const ProfileForm = () => {
  return (
    <div className="bg-white dark:bg-boxDark p-8 rounded-lg shadow-md col-span-2">
      <h2 className="dark:border-gray-500 text-2xl border-[#dedede] border-b-2 py-3 font-semibold text-[#344767] dark:text-white mb-8">
        Update Profile
      </h2>
      <form encType="multipart/form-data">
        <div className="grid grid-cols-12 gap-x-4">
          {/* Upload Image  */}
          <div className="col-span-12 mb-4">
            <div className="flex items-start gap-x-4">
              <div className="relative w-28 h-28 overflow-hidden flex items-center border-2 mb-5 rounded-full">
                <label
                  htmlFor="image"
                  className="absolute cursor-pointer text-gray-400 right-1 left-1 text-center"
                >
                </label>
                <input hidden id="image" name="image" type="file" />

                <img src={avatar} alt="Avatar" />
              </div>

              <div>
                <p className="text-[22px] font-medium">Dip</p>
                <p className="text-[15px] font-normal">Supper Admin</p>
              </div>
            </div>

            {/* Edit Profile Button */}
            <Link to="update-profile">
              <button className="bg-[#cbd5e1] border-none outline-none px-8 py-2 rounded-xl text-gray-800 font-medium">
                Edit Profile
              </button>
            </Link>
          </div>

          {/* Name  */}
          <div className="col-span-6">
            <TextInput title="name" type="text" defaultValue="Dip" />
          </div>

          {/* Email */}
          <div className="col-span-6">
            <TextInput title="email" type="email" defaultValue="Dip@.com" />
          </div>

          {/* Password */}
          <div className="col-span-6">
            <TextInput
              title="password"
              type="password"
              defaultValue="1234567"
            />
          </div>

          {/* Mobile */}
          <div className="col-span-6">
            <TextInput
              title="number"
              type="number"
              defaultValue="01721345453"
            />
          </div>

          {/* Address */}
          <div className="col-span-6">
            <TextInput title="address" type="text" defaultValue="Sylhet" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;