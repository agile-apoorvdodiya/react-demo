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

export const AddEditForm = forwardRef((props, ref) => {
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
      (id
        ? dispatch(putUsersDetails(id, value))
        : dispatch(postUsersDetails(value))
      )
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
      userForm?.setValues(res.data);
    });
  };

  return (
    <Modal
      header="Create new form"
      ref={modal}
      onModalSubmit={userForm.handleSubmit}
    >
      <div>
        <input
          className="bg-transparent border border-gray-500 px-1"
          type="text"
          placeholder="Form title"
        />
      </div>
    </Modal>
  );
});
