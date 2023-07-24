import { useSelector } from "react-redux";

const PersonalDetails = () => {
  const auth = useSelector((state) => state.auth);
  const { roles } = auth;
  const { name, email, phone, address } = auth.userInfo;

  /* sorting role */
  let role;
  if (roles.length === 2 && roles.includes(440)) {
    role = "Admin";
  }
  if (roles.length === 1) {
    role = "Customer";
  }

  return (
    <div>
      <div className='bg-white dark:bg-boxDark p-8 rounded-lg shadow-md'>
        <h2 className='dark:border-gray-500 text-2xl border-[#dedede] border-b-2 py-3 font-semibold text-[#344767] dark:text-white mb-8'>
          Profile Details
        </h2>

        <div>
          <table>
            <tbody>
              {/* Name */}
              <tr>
                <td className='text-gray-500 text-[17px] font-medium py-3'>
                  Name
                </td>
                <td className='text-black dark:text-white text-[17px] font-medium ps-12'>
                  {name}
                </td>
              </tr>

              {/* Role */}
              <tr>
                <td className='text-gray-500 text-[17px] font-medium py-3'>
                  Role
                </td>
                <td className='text-black dark:text-white text-[17px] font-medium ps-12'>
                  {role}
                </td>
              </tr>

              {/* Email */}
              <tr>
                <td className='text-gray-500 text-[17px] font-medium py-3'>
                  Email
                </td>
                <td className='text-black dark:text-white  text-[17px] font-medium ps-12'>
                  {email}
                </td>
              </tr>

              {/* Phone */}
              <tr>
                <td className='text-gray-500 text-[17px] font-medium py-3'>
                  phone
                </td>
                <td className='text-black dark:text-white text-[17px] font-medium ps-12'>
                  {phone || ""}
                </td>
              </tr>

              {/* Address */}
              <tr>
                <td className='text-gray-500 text-[17px] font-medium py-3'>
                  Address
                </td>
                <td className='text-black dark:text-white  text-[17px] font-medium ps-12'>
                  {address || ""}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
