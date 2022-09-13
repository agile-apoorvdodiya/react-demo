import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { getTheme, toggleDarkMode } from "../helper/theme";
import { css } from "./../constants/classes";

export const Header = (props) => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setIsDark(getTheme() || false);
  }, [isDark]);

  const onThemeChange = () => {
    toggleDarkMode();
    setIsDark(getTheme())
  };

  return (
    <>
      <div className="flex p-2 justify-between shadow-md shadow-slate-300 dark:shadow-slate-500">
        <div className="flex">
          <div className="mx-2 cursor-pointer hover:text-blue-400">
            <Link to="/users">Users</Link>
          </div>
          <div className="mx-2 cursor-pointer hover:text-blue-400">
            <Link to="/forms">Forms</Link>
          </div>
        </div>
        <div className="flex">
          <button className={`${css.BTN_OUTLINE} mx-1`} onClick={onThemeChange}>
            {isDark ? "Light" : "Dark"}
          </button>
          <button className={`${css.BTN_PRIM} mx-1`}>logout</button>
        </div>
      </div>
    </>
  );
};
