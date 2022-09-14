import { useDispatch, useSelector } from "react-redux";
import { css } from "../../constants/classes";
import { useEffect, useState } from "react";
import { getTheme, toggleDarkMode } from "../../helper/theme";
import { useFormik, useFormikContext } from "formik";
import * as Yup from "yup";
import { login } from "../../redux/slices/auth";
import { doLogin } from "../../redux/action-call/auth";

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
  const userDetails = useSelector((u) => u);

  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (value) => {
      console.log(value);
      dispatch(doLogin(value)).then((res) => console.log(res));
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required("Please enter email"),
      password: Yup.string().required("Please enter password"),
    }),
  });

  return (
    <div className={css.LAYOUT_WRAPPER}>
      <div className="flex flex-col p-10 justify-center align-middle h-full">
        <form
          className="bg-slate-300 dark:bg-slate-600 w-1/2 mx-auto p-3"
          onSubmit={loginForm.handleSubmit}
        >
          <h2 className="mb-3">Login</h2>
          <div className="flex flex-col mb-2">
            <label htmlFor="email">email</label>
            <input
              type="text"
              name="email"
              id="email"
              className={css.INPUT_TEXT}
              placeholder="you@example.com"
              onChange={loginForm.handleChange}
              value={loginForm.values.email}
            />
            <div className="text-xs text-red-500 dark:text-red-200">
              {loginForm.errors.email}
            </div>
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              name="password"
              id="password"
              className={css.INPUT_TEXT}
              placeholder="******"
              onChange={loginForm.handleChange}
              value={loginForm.values.password}
            />
            <div className="text-xs text-red-500 dark:text-red-200">
              {loginForm.errors.password}
            </div>
          </div>
          <div>
            <button className={css.BTN_PRIM} type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
