import { useEffect, useState } from "react";
import { BsMoon, BsSun } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { trackTheme } from "../../../Features/utilities/utilitySlice";

const DarkModeSwitcher = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : null
  );

  const dispatch = useDispatch();

  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  function onWindowMatches() {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && darkQuery.matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }
  onWindowMatches();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      dispatch(trackTheme("dark"));
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      dispatch(trackTheme("light"));
    }
  }, [theme, dispatch]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div>
      <span className='cursor-pointer' onClick={handleThemeSwitch}>
        {theme === "dark" ? (
          <BsSun className='w-6 h-6 text-[#FFEC99] duration-200 hover:text-white' />
        ) : (
          <BsMoon className='w-5 h-5 text-slate-500 duration-200 hover:text-slate-600' />
        )}
      </span>
    </div>
  );
};

export default DarkModeSwitcher;
