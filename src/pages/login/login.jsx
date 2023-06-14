import { useDispatch, useSelector } from "react-redux";
import { css } from "../../constants/classes";
import { useEffect, useState } from "react";
import { getTheme, toggleDarkMode } from "../../helper/theme";
import { useFormik, useFormikContext } from "formik";
import * as Yup from "yup";
import { login } from "../../redux/slices/auth";
import { doLogin } from "../../redux/action-call/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const Login = (props) => {
  const [isDark, setIsDark] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsDark(getTheme() || false);
  }, [isDark]);

  const onThemeChange = () => {
    toggleDarkMode();
    setIsDark(getTheme());
  };

  const dispatch = useDispatch();

  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (value) => {
      dispatch(doLogin(value)).then((res) => {
        navigate("/users");
      }).catch(err => {
        Swal.fire({
          title: err.message || 'Something went wrong while logging in!',
          icon: 'error'
        })
      });
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
          <div className={css.FORM_GROUP}>
            <label htmlFor="email">email</label>
            <input
              type="email"
              name="email"
              id="email"
              className={css.INPUT_TEXT}
              placeholder="you@example.com"
              onChange={loginForm.handleChange}
              value={loginForm.values.email}
            />
            <div className={css.ERROR_BLOCK}>
              {loginForm.errors.email}
            </div>
          </div>
          <div className={css.FORM_GROUP}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className={css.INPUT_TEXT}
              placeholder="******"
              onChange={loginForm.handleChange}
              value={loginForm.values.password}
            />
            <div className={css.ERROR_BLOCK}>
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
