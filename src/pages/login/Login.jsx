import { useState, useEffect } from "react";
import * as authService from "../../helper/auth.service";
import swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
export const Login = (props) => {
  const navigate = useNavigate()

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    authService
      .login(loginForm)
      .then((res) => {
        props.handleLogin({ status: true })
        navigate('/users', { replace: true })
      })
      .catch((err) => {
        console.log(err);
        props.handleLogin({ status: false })
        swal.fire({
          icon: "error",
          title: err.message || "Something went wrong",
          text: "Please try again",
        });
      });
  };

  const handleChange = (e, property) => {
    setLoginForm({
      ...loginForm,
      [property]: e.target.value,
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow">
        <div className="card-header">
          <span className="display-4">Login</span>
        </div>
        <div className="card-body">
          <form>
            <div className="form-group">
              <label htmlFor="email-in" className="form-label">
                Email
              </label>
              <input
                onChange={(e) => handleChange(e, "email")}
                value={loginForm.email}
                type="email"
                id="email-in"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password-in" className="form-label">
                Password
              </label>
              <input
                onChange={(e) => handleChange(e, "password")}
                value={loginForm.password}
                type="password"
                id="password-in"
                className="form-control"
              />
            </div>
            <div className="text-right">
              <button
                className="btn btn-primary"
                onClick={handleSubmit}
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
