const PersonalDetails = () => {
  return (
    <div>
      <div className="bg-white dark:bg-boxDark p-8 rounded-lg shadow-md">
        <h2 className="dark:border-gray-500 text-2xl border-[#dedede] border-b-2 py-3 font-semibold text-[#344767] dark:text-white mb-8">
          Profile Details
        </h2>

        <div>
          <table>
            <tbody>
              {/* Name */}
              <tr>
                <td className="text-gray-500 text-[17px] font-medium py-3">
                  Name
                </td>
                <td className="text-black dark:text-white text-[17px] font-medium ps-12">
                  Dip
                </td>
              </tr>

              {/* Role */}
              <tr>
                <td className="text-gray-500 text-[17px] font-medium py-3">
                  Role
                </td>
                <td className="text-black dark:text-white text-[17px] font-medium ps-12">
                  Supper Admin
                </td>
              </tr>

              {/* Email */}
              <tr>
                <td className="text-gray-500 text-[17px] font-medium py-3">
                  Email
                </td>
                <td className="text-black dark:text-white  text-[17px] font-medium ps-12">
                  Dip@gmail.com
                </td>
              </tr>

              {/* Phone */}
              <tr>
                <td className="text-gray-500 text-[17px] font-medium py-3">
                  phone
                </td>
                <td className="text-black dark:text-white text-[17px] font-medium ps-12">
                  01721345453
                </td>
              </tr>

              {/* Address */}
              <tr>
                <td className="text-gray-500 text-[17px] font-medium py-3">
                  Address
                </td>
                <td className="text-black dark:text-white  text-[17px] font-medium ps-12">
                  Sylhet
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
