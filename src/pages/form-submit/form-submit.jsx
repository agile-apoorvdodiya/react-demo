import { useDispatch, useSelector } from "react-redux";
import { css } from "../../constants/classes";
import { useEffect, useState } from "react";
import { getTheme, toggleDarkMode } from "../../helper/theme";
import { useFormik, useFormikContext } from "formik";
import * as Yup from "yup";
import { getSingleForm, submitForm } from "../../redux/action-call/forms";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export const FormSubmit = (props) => {
  const [isDark, setIsDark] = useState(true);
  const navigate = useNavigate();
  const params = useParams();
  const [rawForm, setRawForm] = useState([]);

  useEffect(() => {
    setIsDark(getTheme() || false);
  }, [isDark]);

  useEffect(() => {
    if (params.id) {
      getFormDetails(params.id);
    }
  }, [params.id]);

  const getFormDetails = (id) => {
    dispatch(getSingleForm(id))
      .then((res) => {
        const value = {};
        if (res?.data?.form?.length) {
          setRawForm(res.data.form);
          value.title = res.data.title || "";
          value.id = params.id || "";
          value.form = [];
          for (const control of res.data.form) {
            value.form.push({ [control.name]: "" });
          }
        }
        form.setValues(value);
      })
      .catch((err) => {
        Swal.fire({
          title: "Something went wrong!",
          text: "Please try again later.",
          icon: "error"
        })
      });
  };

  const onThemeChange = () => {
    toggleDarkMode();
    setIsDark(getTheme());
  };

  const dispatch = useDispatch();

  const form = useFormik({
    initialValues: {
      form: [],
      title: "",
      id: "",
    },
    onSubmit: (value) => {
      const data = {
        ...value,
        id: params.id,
      };
      dispatch(submitForm(data))
        .then((res) => {
          Swal.fire({
            title: "Form submitted successfully!",
          }).then((res) => {
            window.close();
          });
        })
        .catch((err) => {
          Swal.fire({
            title: err.message || "Something went wrong while logging in!",
            icon: "error",
          });
        });
    },
  });

  return (
    <div className={css.LAYOUT_WRAPPER}>
      <div className="flex flex-col p-10 justify-top align-middle h-full">
        <form
          className="bg-slate-300 dark:bg-slate-600 w-full md:w-3/4 mx-auto p-3"
          onSubmit={form.handleSubmit}
        >
          <h2 className="mb-3">{form?.values?.title}</h2>
          {rawForm.map((el, index) => (
            <>
              {["checkbox", "radio"].includes(el?.type) ? (
                <>
                  <div className={css.FORM_GROUP}>
                    <label>{el?.label}</label>
                    <div className="flex">
                      {el?.controls?.map((c) => (
                        <div className="mr-2" key={c?._id}>
                          <input
                            type={el?.type}
                            name={`form[${index}].${el?.name}`}
                            id={`label-for-${c?.label}`}
                            className="mr-1"
                            onChange={form.handleChange}
                            value={c?.value}
                          />
                          <label htmlFor={`label-for-${c?.label}`}>
                            {c?.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className={css.FORM_GROUP}>
                    <label htmlFor={`label-for-${el?.label}`}>
                      {el?.label}
                    </label>
                    <input
                      type={el?.type}
                      name={`form[${index}].${el?.name}`}
                      id={`label-for-${el?.label}`}
                      className={css.INPUT_TEXT}
                      placeholder={el?.placeholder}
                      onChange={form.handleChange}
                      value={form.values[el?.name]}
                    />
                  </div>
                </>
              )}
            </>
          ))}
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
