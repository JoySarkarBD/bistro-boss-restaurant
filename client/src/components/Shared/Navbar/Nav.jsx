import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "./../../../assets/logo.png";
import "./Nav.css";
const Nav = () => {
  const [scroll, setScroll] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //nav item options
  const navOptions = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "activeStyle" : "hover:text-white"
          }
        >
          HOME
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "activeStyle" : "hover:text-white"
          }
        >
          CONTACT US
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/menu"
          className={({ isActive }) =>
            isActive ? "activeStyle" : "hover:text-white"
          }
        >
          OUR MENU
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/shop"
          className={({ isActive }) =>
            isActive ? "activeStyle" : "hover:text-white"
          }
        >
          OUR SHOP
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/myCarts"
          className={({ isActive }) =>
            isActive ? "activeStyle" : "hover:text-white"
          }
        >
          CARTS
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="badge badge-sm indicator-item">0</span>
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive ? "activeStyle" : "hover:text-white"
          }
        >
          LOGIN
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/register"
          className={({ isActive }) =>
            isActive ? "activeStyle" : "hover:text-white"
          }
        >
          SIGN UP
        </NavLink>
      </li>
    </>
  );
  return (
    <div
      className={` ${
        scroll ? "bg-navBgColor bg-opacity-80" : "bg-transparent"
      } shadow-lg fixed z-10 left-0 right-0`}
    >
      <div className="navbar justify-between text-white px-14">
        <div className="navbar-start w-5/6">
          <div className="dropdown">
            <label tabIndex="0" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex="0"
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-black rounded-box w-52 text-white font-bold"
            >
              {navOptions}
            </ul>
          </div>
          <Link to="/" className="px-6">
            <img src={logo} className="" alt="Logo" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal items-center px-1 font-bold">
            {navOptions}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Nav;
