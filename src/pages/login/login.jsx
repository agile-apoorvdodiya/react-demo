import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/auth";
import { css } from "../../constants/classes";
import { useEffect, useState } from "react";
import { getTheme, toggleDarkMode } from "../../helper/theme";

export const Login = (props) => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setIsDark(getTheme() || false);
  }, [isDark]);

  const onThemeChange = () => {
    toggleDarkMode();
    setIsDark(getTheme());
  };

  const dispatch = useDispatch();

  return (
    <div className={css.LAYOUT_WRAPPER}>
      <div className="flex flex-col p-10 justify-center align-middle h-full">
        <h2 className="text-center">Login</h2>
        <div className="flex flex-col align-middle w-1/2 m-auto">
          <div className="flex flex-col">
            <label htmlFor="userName">Username</label>
            <input className="bg-slate-400 placeholder-slate-700 rounded-sm outline-none text-xs p-1 h-fit" placeholder="you@example.com" type="text" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input className="bg-slate-400 placeholder-slate-700 rounded-sm outline-none text-xs p-1 h-fit" placeholder="******" type="password" />
          </div>
        </div>
      </div>
    </div>
  );
};
