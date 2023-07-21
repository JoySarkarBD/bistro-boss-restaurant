import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "./../../../assets/logo.png";
import DropLink from "./DropLink";
import "./Nav.css";

const Nav = () => {
  const [open, setOpen] = useState(false);
  // Declare a state variable 'scroll' using the 'useState' hook
  const [scroll, setScroll] = useState(false);

  // Define a function called 'handleScroll'.
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  // Use the 'useEffect' hook to add an event listener for the 'scroll' event when the component mounts.
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //nav item options
  const navOptions = (
    <>
      <li className='py-2'>
        <NavLink
          to='/'
          className={({ isActive }) =>
            isActive ? "activeStyle" : "hover:text-white"
          }>
          HOME
        </NavLink>
      </li>
      <li className='py-2'>
        <NavLink
          to='/contact'
          className={({ isActive }) =>
            isActive ? "activeStyle" : "hover:text-white"
          }>
          CONTACT
        </NavLink>
      </li>
      <li className='py-2'>
        <NavLink
          to='/menu'
          className={({ isActive }) =>
            isActive ? "activeStyle" : "hover:text-white"
          }>
          MENU
        </NavLink>
      </li>
      <li className='py-2'>
        <NavLink
          to='/shop'
          className={({ isActive }) =>
            isActive ? "activeStyle" : "hover:text-white"
          }>
          SHOP
        </NavLink>
      </li>
      <li className='py-2'>
        <NavLink
          to='/cart'
          className={({ isActive }) =>
            isActive ? "activeStyle" : "hover:text-white"
          }>
          <div className='indicator'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
              />
            </svg>
            <span className='badge badge-sm indicator-item'>0</span>
          </div>
        </NavLink>
      </li>
    </>
  );

  return (
    <div
      className={` ${
        scroll ? "bg-[#0f172a] duration-700" : "bg-transparent"
      } shadow-lg fixed z-10 left-0 right-0`}>
      <div className='flex justify-between font-medium  text-white px-14'>
        <div className='z-50 p-5 md:w-auto w-full flex justify-between'>
          <div className='w-full'>
            <img src={logo} alt='logo' className='cursor-pointer h-9' />
          </div>
          <div
            className='text-3xl md:hidden text-white'
            onClick={() => setOpen(!open)}>
            <ion-icon name={`${open ? "close" : "menu"}`}></ion-icon>
          </div>
        </div>
        <ul className='md:flex hidden uppercase font-semibold items-center gap-8 font-[Poppins]'>
          {navOptions}
          <DropLink />
        </ul>

        {/* Mobile nav */}
        <ul
          className={`
        md:hidden bg-[#232D3A] fixed w-full top-0 overflow-y-auto bottom-0 py-24 pl-20
        duration-500 ${open ? "left-0" : "left-[-100%]"}
        `}>
          <div className='my-5'>{navOptions}</div>
          <DropLink />
        </ul>
      </div>
    </div>
  );
};

export default Nav;
