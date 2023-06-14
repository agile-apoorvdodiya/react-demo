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
  putFormDetails,
  postFormDetails,
  getSingleForm,
} from "../../../redux/action-call/forms";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { FormListEditor } from "./form-list-editor";

export const AddEditForm = forwardRef((props, ref) => {
  const modal = useRef();
  const dispatch = useDispatch();
  const [id, setId] = useState(null);
  const form = useFormik({
    initialValues: {
      title: "",
      form: [],
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required("Please Enter form title"),
      form: Yup.array().min(1, "Please select at least one form element"),
    }),
    onSubmit: (value) => {
      (id
        ? dispatch(putFormDetails(id, value))
        : dispatch(postFormDetails(value))
      )
        .then((res) => {
          modal.current.close();
          props.onSuccess();
          Swal.fire({
            title: res?.message || "Successfully saved form details!",
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
    if (id) {
      getFormDetails();
    } else {
      form.resetForm();
    }
  }, [id]);

  useImperativeHandle(ref, () => ({
    open: (id = null) => {
      setId(id);
      modal.current.open();
    },
  }));

  const getFormDetails = () => {
    dispatch(getSingleForm(id, {})).then((res) => {
      form?.setValues(res.data);
    });
  };

  return (
    <Modal
      header={id ? "Edit form" : "Create new form"}
      ref={modal}
      onModalSubmit={form.handleSubmit}
    >
      <div>
        <input
          className="bg-transparent border border-gray-500 px-1"
          type="text"
          placeholder="Form title"
          name="title"
          onChange={form.handleChange}
          value={form.values.title}
        />
      </div>
      <FormListEditor
        selectedList={form?.values?.form}
        onListUpdate={form.setFieldValue}
      />
    </Modal>
  );
});
