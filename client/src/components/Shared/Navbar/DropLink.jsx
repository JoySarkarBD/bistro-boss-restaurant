import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  useAccountVerificationLinkMutation,
  useLogoutQuery,
} from "../../../Features/auth/authApiSlice";
import { logout } from "../../../Features/auth/authSlice";
import user from "../../../assets/userImg.png";
import "./Nav.css";

const DropLink = () => {
  const [isLogOut, setIsLogOut] = useState(false);
  const dispatch = useDispatch();

  const { data, status, isLoading, isError } = useLogoutQuery(undefined, {
    skip: !isLogOut,
  });

  const [accountVerificationLink] = useAccountVerificationLinkMutation();
  const auth = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const imgRef = useRef();

  // @desc verify user after login
  const sendVerifyLink = async () => {
    try {
      const userId = auth.userInfo.userId;
      const response = await accountVerificationLink({ userId }).unwrap();
      if (response.msg === "success") {
        toast.success(response?.data, { duration: 3000 });
      } else {
        toast.error("Something is wrong , please try again later", {
          duration: 3000,
        });
      }
    } catch (error) {
      const errorStatus = [401, 404, 500];
      if (errorStatus.includes(error.status)) {
        toast.error(error.data.err, { duration: 2000 });
      }
    }
  };

  const Menus = [
    {
      name: "Profile",
      link: "/dashboard/profile",
      isAuth: true,
    },
    {
      name: "Dashboard",
      link: "/dashboard",
      isAuth: true,
    },
    {
      name: "Sign Up",
      link: "/register",
      isAuth: false,
    },
    {
      name: "Log In",
      link: "/login",
      isAuth: false,
    },
  ];

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (e.target !== menuRef.current && e.target !== imgRef.current) {
        setOpen(false);
      }
    });
  }, []);

  // show after logout
  useEffect(() => {
    if (!isLoading && !isError) {
      if (status === "fulfilled") {
        toast.success("Logout successfully");
        dispatch(logout());
      }
    }
  }, [data, isError, isLoading, status, dispatch]);

  // @desc handle log out
  const handleLogout = () => {
    setIsLogOut(true);
  };

  return (
    <div className='relative'>
      <img
        onClick={() => setOpen(!open)}
        ref={imgRef}
        src={user}
        alt=''
        className='h-9 w-9 object-cover border-4 border-gray-400 rounded-full cursor-pointer  '
      />

      {open && (
        <div
          ref={menuRef}
          className={`md:bg-[#232D3A] w-52 md:p-4 sm:shadow-none  md:shadow-lg absolute sm:bg-transparent md:-right-1/3 lg:-right-8 xl:-right-8 top-[161%] rounded-lg sm:p-0  ${
            !auth.loggedIn ? "h-30" : "h-50"
          } `}>
          <ul>
            {Menus.filter((menu) => {
              if (!auth?.loggedIn) {
                return !menu.isAuth;
              }
              return menu.isAuth;
            }).map((m) => {
              return (
                <NavLink to={m.link} key={nanoid()}>
                  <li
                    onClick={() => setOpen(false)}
                    className='p-2 text-white text-base font-semibold cursor-pointer rounded-lg hover:bg-indigo-700'>
                    {m.name}
                  </li>
                </NavLink>
              );
            })}

            {auth?.loggedIn && !auth?.userInfo?.verified && (
              <li
                className='p-2 text-white text-base font-semibold cursor-pointer rounded-lg hover:bg-indigo-700'
                onClick={sendVerifyLink}>
                Verify
              </li>
            )}
            {auth?.loggedIn && (
              <li
                className='p-2 text-white text-base font-semibold cursor-pointer rounded-lg hover:bg-indigo-700'
                onClick={handleLogout}>
                Logout
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropLink;
