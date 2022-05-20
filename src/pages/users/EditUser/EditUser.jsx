import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  createUser,
  getUserById,
  updateUserById,
} from "../../../helper/user.service";
import * as yup from "yup";
import { Formik, useFormik } from "formik";
import swal from "sweetalert2";

export const EditUser = (props) => {
  const userId = useParams()["id"];
  const navigate = useNavigate();
  useEffect(() => {
    if (userId)
      getUserById(userId).then((res) => {
        formik.setValues(res?.data?.user);
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      admin: false,
      contact: "",
    },
    validationSchema: yup.object().shape({
      email: yup.string().required("Please Enter email"),
      name: yup.string().required("Please Enter name"),
      contact: yup
        .string()
        .required("Please Enter contact")
        .length(10, "Contact must be of 10 characters"),
      password: yup
        .string()
        .required("Please Enter password")
        .min(6, "Password must be of at lease 6 characters"),
    }),
    onSubmit: (value) => {
      if (formik.isValid) {
        (!!userId
          ? updateUserById(userId, formik.values)
          : createUser(formik.values)
        )
          .then((res) => {
            swal
              .fire({
                icon: "success",
                title: res?.data?.message,
              })
              .then((res) => {
                navigate("/users");
              });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  });

  return (
    <div className="container">
      <div className="display-4 mt-3">Edit User</div>
      <form onSubmit={formik.handleSubmit}>
        <table className="table mt-2">
          <tbody>
            <tr>
              <td>Name</td>
              <td>
                <div>
                  <input
                    type="text"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    id="name"
                    value={formik.values.name}
                  />
                </div>
                <div className="fst-italic text-danger">
                  {formik?.touched?.name && formik?.errors?.name}
                </div>
              </td>
            </tr>
            <tr>
              <td>Email</td>
              <td>
                <div>
                  <input
                    type="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    id="email"
                    value={formik.values.email}
                  />
                </div>
                <div className="fst-italic text-danger">
                  {formik?.touched?.email && formik?.errors?.email}
                </div>
              </td>
            </tr>
            <tr>
              <td>Contact</td>
              <td>
                <div>
                  <input
                    type="tel"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    id="contact"
                    value={formik.values.contact}
                  />
                </div>
                <div className="fst-italic text-danger">
                  {formik?.touched?.contact && formik?.errors?.contact}
                </div>
              </td>
            </tr>
            <tr>
              <td>Password</td>
              <td>
                <div>
                  <input
                    type="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    id="password"
                    value={formik.values.password}
                  />
                </div>
                <div className="fst-italic text-danger">
                  {formik?.touched?.password && formik?.errors?.password}
                </div>
              </td>
            </tr>
            <tr>
              <td>Admin</td>
              <td>
                <div>
                  <input
                    type="checkbox"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    id="admin"
                    checked={formik.values.admin}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <button type="submit" className="btn btn-primary btn-sm me-2">
                  Save
                </button>
                <Link
                  type="button"
                  className="btn btn-primary btn-sm"
                  to="/users"
                >
                  cancel
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};
