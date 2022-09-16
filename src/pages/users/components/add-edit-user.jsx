import { useFormik } from "formik";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import { Modal } from "../../../components/modal";
import { css } from "../../../constants/classes";
import {
  getUsersDetails,
  postUsersDetails,
  putUsersDetails,
} from "../../../redux/action-call/users";
import * as Yup from "yup";
import Swal from "sweetalert2";

export const AddEditUser = forwardRef((props, ref) => {
  const modal = useRef();
  const dispatch = useDispatch();
  const [id, setId] = useState(null);
  const userForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      contact: "",
      admin: false,
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required("Please Enter email"),
      name: Yup.string().required("Please Enter name"),
      contact: Yup.string()
        .required("Please Enter contact")
        .length(10, "Contact must be of 10 characters"),
      password: Yup.string()
        .required("Please Enter password")
        .min(6, "Password must be of at lease 6 characters"),
    }),
    onSubmit: (value) => {
      (id ?
        dispatch(putUsersDetails(id, value)) : dispatch(postUsersDetails(value)))
        .then((res) => {
          modal.current.close();
          props.onSuccess();
          Swal.fire({
            title: res?.message || "Successfully saved user details!",
            icon: "success",
          });
        })
        .catch((err) => {
          Swal.fire({
            title: "Something went wrong!",
            icon: "error",
          });
        });
    },
  });

  useEffect(() => {
    id && getUserData();
  }, [id]);

  useImperativeHandle(ref, () => ({
    open: (id = null) => {
      setId(id);
      modal.current.open();
    },
  }));

  const getUserData = () => {
    dispatch(getUsersDetails(id, {})).then((res) => {
      userForm?.setValues(res.user);
    });
  };

  return (
    <Modal header="Add user" ref={modal} onModalSubmit={userForm.handleSubmit}>
      <div className={css.FORM_GROUP}>
        <label htmlFor="i-name">Name</label>
        <input
          className={css.INPUT_TEXT}
          type="text"
          id="i-name"
          name="name"
          onChange={userForm.handleChange}
          value={userForm.values.name}
        />
        <div className={css.ERROR_BLOCK}>{userForm.errors.name}</div>
      </div>
      <div className={css.FORM_GROUP}>
        <label htmlFor="i-email">Email</label>
        <input
          className={css.INPUT_TEXT}
          type="email"
          id="i-email"
          name="email"
          onChange={userForm.handleChange}
          value={userForm.values.email}
        />
        <div className={css.ERROR_BLOCK}>{userForm.errors.email}</div>
      </div>
      <div className={css.FORM_GROUP}>
        <label htmlFor="i-password">Password</label>
        <input
          className={css.INPUT_TEXT}
          type="password"
          id="i-password"
          name="password"
          onChange={userForm.handleChange}
          value={userForm.values.password}
        />
        <div className={css.ERROR_BLOCK}>{userForm.errors.password}</div>
      </div>
      <div className={css.FORM_GROUP}>
        <label htmlFor="i-contact">Contact</label>
        <input
          className={css.INPUT_TEXT}
          type="number"
          id="i-contact"
          name="contact"
          onChange={userForm.handleChange}
          value={userForm.values.contact}
        />
        <div className={css.ERROR_BLOCK}>{userForm.errors.contact}</div>
      </div>
      <div className="flex align-middle">
        <label htmlFor="i-make-admin">Make admin</label>
        <input
          className="ml-2"
          type="checkbox"
          id="i-make-admin"
          name="admin"
          onChange={userForm.handleChange}
          checked={userForm.values.admin}
        />
      </div>
    </Modal>
  );
});
