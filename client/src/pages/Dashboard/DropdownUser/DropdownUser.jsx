import { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { SlLogout } from "react-icons/sl";
import { Link } from "react-router-dom";

import userOne from "./../../../assets/user.png";

const DropdownUser = () => {
  // Declare a state variable 'dropdownOpen' using the 'useState' hook
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className='relative'>
      <Link
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className='flex items-center gap-4'
        to='#'>
        <span className='hidden text-right md:block'>
          <span className='block text-sm font-medium text-black dark:text-white'>
            Dipto Das
          </span>
          <span className='block text-xs text-black dark:text-white'>
            Web Designer
          </span>
        </span>

        <span className='h-12 w-12 rounded-full'>
          <img src={userOne} alt='User' />
        </span>

        <svg
          className={`hidden text-black fill-current sm:block dark:text-slate-500 ${
            dropdownOpen ? "rotate-180" : ""
          }`}
          width='12'
          height='8'
          viewBox='0 0 12 8'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z'
            fill=''
          />
        </svg>
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`dropdown ${
          dropdownOpen === true ? "!-translate-y-0" : "-translate-y-96"
        }`}>
        <ul className='flex flex-col gap-5 border-b border-stroke px-6 py-7 dark:border-strokedark'>
          {/* Profile */}
          <li>
            <Link to='/profile' className='dropdown-item'>
              <FaRegUser className='w-5 h-5' />
              My Profile
            </Link>
          </li>

          {/* Setting */}
          <li>
            <Link to='/settings' className='dropdown-item'>
              <FiSettings className='w-5 h-5' />
              Account Settings
            </Link>
          </li>
        </ul>

        {/* Log out button */}
        <button className='flex items-center gap-3  py-4 px-6 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base'>
          <SlLogout className='w-5 h-5' />
          Log Out
        </button>
      </div>
      {/* <!-- Dropdown End --> */}
    </div>
  );
};

export default DropdownUser;
