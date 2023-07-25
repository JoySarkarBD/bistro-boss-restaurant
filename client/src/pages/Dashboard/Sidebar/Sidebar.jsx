import { useState } from "react";
import { AiFillHome, AiFillShopping } from "react-icons/ai";
import { BiMenuAltRight, BiUserPlus } from "react-icons/bi";
import { BsBuildingFillAdd, BsFillCartFill } from "react-icons/bs";
import { FaUsersCog } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import { GoChevronDown } from "react-icons/go";
import {
  MdEmail,
  MdOutlineCategory,
  MdOutlineFastfood,
  MdPayment,
  MdReviews,
} from "react-icons/md";
import { SiBookstack } from "react-icons/si";
// import { RxDashboard } from "react-icons/rx";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import logoDark from "./../../../assets/logo-dark.png";
import logoWhite from "./../../../assets/logo-white.png";

// eslint-disable-next-line react/prop-types
const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  // Hook
  const location = useLocation();
  const { pathname } = location;
  const [isOpen, setOpen] = useState(false);
  const { theme } = useSelector(state => state.utility);

  return (
    <aside
      className={`absolute left-0 top-0 z-10 flex h-screen w-72 flex-col overflow-y-hidden 
      bg-white
      dark:bg-boxDark shadow-lg duration-300 ease-linear  lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
      {/* <!-- SIDEBAR HEADER --> */}
      <div className='flex items-center justify-between gap-2 px-6 py-6 lg:py-6'>
        <NavLink to='/'>
          <div className='flex items-center gap-4'>
            <img
              src={theme?.theme === "dark" ? logoWhite : logoDark}
              alt='Logo'
            />
          </div>
        </NavLink>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls='sidebar'
          aria-expanded={sidebarOpen}
          className='block lg:hidden'>
          <svg
            className='fill-current'
            width='20'
            height='18'
            viewBox='0 0 20 18'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z'
              fill=''
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className='sidebar-head'>
        {/* <!-- Sidebar Menu --> */}
        <nav className='sidebar-nav'>
          <h3 className='mb-4 ml-4 text-sm font-semibold text-bodyDark2'>
            MENU
          </h3>
          {/* <!-- Menu Group --> */}
          <div>
            <ul className='mb-6 flex flex-col gap-1.5'>
              {/* <!-- Dashboard submenu --> */}
              {/* <li>
                <a
                  onClick={() => setOpen(!isOpen)}
                  className='cursor-pointer sidebar-menu-item'>
                  <span>
                    <RxDashboard className='w-5 h-5' />
                  </span>
                  <span>Dashboard</span>
                  <span className='ml-auto'>
                    {isOpen ? (
                      <GoChevronDown className='w-4 h-4' />
                    ) : (
                      <FiChevronRight className='w-4 h-4' />
                    )}
                  </span>
                </a>

              submenu item
                <ul
                  className={`overflow-hidden transition-height duration-300 ease-in-out ${
                    isOpen ? "h-24" : "h-0"
                  }`}>
                  <li className='mb-2'>
                    <NavLink
                      to='/analytics'
                      className={`sidebar-submenu-item ${
                        pathname.includes("analytics") &&
                        "bg-slate-300 dark:bg-meta-4"
                      }`}>
                      Analytics
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='ecommerce'
                      className={`sidebar-submenu-item ${
                        pathname.includes("ecommerce") &&
                        "bg-slate-300 dark:bg-meta-4"
                      }`}>
                      E-Commerce
                    </NavLink>
                  </li>
                </ul>
                submenu items
              </li> */}
              {/* <!-- Dashboard submenu --> */}

              {/* <!-- User Home --> */}
              <li>
                <NavLink
                  to='/dashboard/userHome'
                  className={`sidebar-menu-item ${
                    pathname.includes("userHome") &&
                    "bg-slate-300 dark:bg-meta-4"
                  }`}>
                  <AiFillHome className='w-5 h-5' />
                  Home
                </NavLink>
              </li>
              {/* <!-- User Home --> */}

              {/* <!-- User Profile --> */}
              <li>
                <NavLink
                  to='/dashboard/profile'
                  className={`sidebar-menu-item ${
                    pathname.includes("userHome") &&
                    "bg-slate-300 dark:bg-meta-4"
                  }`}>
                  <BiUserPlus className='w-5 h-5' />
                  Profile
                </NavLink>
              </li>
              {/* <!-- User Profile --> */}

              {/* <!-- Category submenu --> */}
              <li>
                <a
                  onClick={() => setOpen(!isOpen)}
                  className='cursor-pointer sidebar-menu-item'>
                  <span>
                    <MdOutlineCategory className='w-5 h-5' />
                  </span>
                  <span>Category</span>
                  <span className='ml-auto'>
                    {isOpen ? (
                      <GoChevronDown className='w-4 h-4' />
                    ) : (
                      <FiChevronRight className='w-4 h-4' />
                    )}
                  </span>
                </a>

                {/* submenu item */}
                <ul
                  className={`overflow-hidden transition-height duration-300 ease-in-out ${
                    isOpen ? "h-24" : "h-0"
                  }`}>
                  <li className='mb-2'>
                    <NavLink
                      to='/add-category'
                      className={`sidebar-submenu-item ${
                        pathname.includes("add-category") &&
                        "bg-slate-300 dark:bg-meta-4"
                      }`}>
                      Add Category
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/manage-category'
                      className={`sidebar-submenu-item ${
                        pathname.includes("manage-category") &&
                        "bg-slate-300 dark:bg-meta-4"
                      }`}>
                      Manage Category
                    </NavLink>
                  </li>
                </ul>
                {/* submenu items */}
              </li>
              {/* <!-- Category submenu --> */}

              {/* <!-- Item submenu --> */}
              <li>
                <a
                  onClick={() => setOpen(!isOpen)}
                  className='cursor-pointer sidebar-menu-item'>
                  <span>
                    <MdOutlineFastfood className='w-5 h-5' />
                  </span>
                  <span>Menu</span>
                  <span className='ml-auto'>
                    {isOpen ? (
                      <GoChevronDown className='w-4 h-4' />
                    ) : (
                      <FiChevronRight className='w-4 h-4' />
                    )}
                  </span>
                </a>

                {/* submenu item */}
                <ul
                  className={`overflow-hidden transition-height duration-300 ease-in-out ${
                    isOpen ? "h-24" : "h-0"
                  }`}>
                  <li className='mb-2'>
                    <NavLink
                      to='/add-menu'
                      className={`sidebar-submenu-item ${
                        pathname.includes("add-menu") &&
                        "bg-slate-300 dark:bg-meta-4"
                      }`}>
                      Add Menu
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to='/manage-menu'
                      className={`sidebar-submenu-item ${
                        pathname.includes("manage-menu") &&
                        "bg-slate-300 dark:bg-meta-4"
                      }`}>
                      Manage Menu
                    </NavLink>
                  </li>
                </ul>
                {/* submenu items */}
              </li>
              {/* <!-- Item submenu --> */}

              {/* <!-- manage booking --> */}
              <li>
                <NavLink
                  to='/dashboard/manage-booking'
                  className={`sidebar-menu-item ${
                    pathname.includes("manage-booking") &&
                    "bg-slate-300 dark:bg-meta-4"
                  }`}>
                  <SiBookstack className='w-5 h-5' />
                  Booking Manage
                </NavLink>
              </li>
              {/* <!-- manage booking  --> */}

              {/* <!-- manage all users --> */}
              <li>
                <NavLink
                  to='/dashboard/manage-all-users'
                  className={`sidebar-menu-item ${
                    pathname.includes("manage-all-users") &&
                    "bg-slate-300 dark:bg-meta-4"
                  }`}>
                  <FaUsersCog className='w-5 h-5' />
                  Manage All Users
                </NavLink>
              </li>
              {/* <!-- manage all users   --> */}

              {/* <!-- Payment History --> */}
              <li>
                <NavLink
                  to='/dashboard/payment'
                  className={`sidebar-menu-item ${
                    pathname.includes("payment") &&
                    "bg-slate-300 dark:bg-meta-4"
                  }`}>
                  <MdPayment className='w-5 h-5' />
                  Payment History
                </NavLink>
              </li>
              {/* <!-- Payment History --> */}

              {/* <!-- Review --> */}
              <li>
                <NavLink
                  to='/dashboard/payment'
                  className={`sidebar-menu-item ${
                    pathname.includes("review") && "bg-slate-300 dark:bg-meta-4"
                  }`}>
                  <MdReviews className='w-5 h-5' />
                  Add Review
                </NavLink>
              </li>
              {/* <!-- Review --> */}

              {/* <!-- My Cart --> */}
              <li>
                <NavLink
                  to='/dashboard/myCart'
                  className={`sidebar-menu-item ${
                    pathname.includes("myCart") && "bg-slate-300 dark:bg-meta-4"
                  }`}>
                  <BsFillCartFill className='w-5 h-5' />
                  My Cart
                </NavLink>
              </li>
              {/* <!-- My Cart --> */}

              {/* <!-- My Booking --> */}
              <li>
                <NavLink
                  to='/myCart'
                  className={`sidebar-menu-item ${
                    pathname.includes("calendar") &&
                    "bg-slate-300 dark:bg-meta-4"
                  }`}>
                  <BsBuildingFillAdd className='w-5 h-5' />
                  My Booking
                </NavLink>
              </li>
              {/* <!-- Menu Item My Cart --> */}
            </ul>
          </div>

          {/* <!-- Others Group --> */}
          <div>
            <h3 className='mb-4 ml-4 text-sm font-semibold text-bodyDark2'>
              OTHERS
            </h3>

            <ul className='mb-6 flex flex-col gap-1.5'>
              {/* <!-- Home Item --> */}
              <li>
                <NavLink
                  to='/'
                  className={`sidebar-menu-item ${
                    pathname.includes("home") && "bg-slate-300 dark:bg-meta-4"
                  }`}>
                  <AiFillHome className='w-5 h-5' />
                  Home
                </NavLink>
              </li>
              {/* <!-- Home Item --> */}

              {/* <!-- Menu Item --> */}
              <li>
                <NavLink
                  to='/menu'
                  className={`sidebar-menu-item ${
                    pathname.includes("menu") && "bg-slate-300 dark:bg-meta-4"
                  }`}>
                  <BiMenuAltRight className='w-5 h-5' />
                  Menu
                </NavLink>
              </li>
              {/* <!-- Menu Item --> */}

              {/* <!-- Shop Item --> */}
              <li>
                <NavLink
                  to='/order/salad'
                  className={`sidebar-menu-item ${
                    pathname.includes("order") && "bg-slate-300 dark:bg-meta-4"
                  }`}>
                  <AiFillShopping className='w-5 h-5' />
                  Shop
                </NavLink>
              </li>
              {/* <!-- Shop Item --> */}

              {/* <!-- Contact Item --> */}
              <li>
                <NavLink
                  to='/contact'
                  className={`sidebar-menu-item ${
                    pathname.includes("contact") &&
                    "bg-slate-300 dark:bg-meta-4"
                  }`}>
                  <MdEmail className='w-5 h-5' />
                  Contact
                </NavLink>
              </li>
              {/* <!-- Contact Item --> */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
