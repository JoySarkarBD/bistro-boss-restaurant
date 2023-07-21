import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import user from "../../../assets/userImg.png";
import "./Nav.css";

const DropLink = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const imgRef = useRef();
  // const Menus = ["Profile", "Dashboard", "Sign Up", "Login", "Logout"];
  const Menus = [
    {
      name: "Profile",
      link: "/update-profile",
    },
    {
      name: "Dashboard",
      link: "/dashboard",
    },
    {
      name: "Sign Up",
      link: "/register",
    },
    {
      name: "Log In",
      link: "/login",
    },
    {
      name: "Sign Out",
      link: "/logout",
    },
  ];

  useEffect(() => {
    window.addEventListener("click", e => {
      console.log(e.target.value);
      if (e.target !== menuRef.current && e.target !== imgRef.current) {
        setOpen(false);
      }
    });
  }, []);

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
          className='md:bg-[#232D3A] w-52 h-56 md:p-4 sm:shadow-none  md:shadow-lg absolute sm:bg-transparent md:-right-1/3 lg:-right-8 xl:-right-8 top-[161%] rounded-lg sm:p-0 '>
          <ul>
            {Menus.map(m => {
              return (
                <li
                  onClick={() => setOpen(false)}
                  className='p-2 text-white text-base font-semibold cursor-pointer rounded-lg hover:bg-indigo-700 '
                  key={m}>
                  <NavLink to={m.link}>{m.name}</NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropLink;
