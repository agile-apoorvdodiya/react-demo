import { css } from "../../constants/classes";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddEditForm } from "./components/add-edit-form";
import { getFormsList, deleteForm } from "../../redux/action-call/forms";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const FormsList = (props) => {
  const forms = useSelector((s) => s?.forms?.formList);
  const formModal = useRef();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    getForms(); // api call
  }, []);

  const getForms = () => {
    dispatch(getFormsList());
  };
  const deleteSingleForm = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this form?",
      icon: "warning",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        dispatch(deleteForm(id))
          .then((res) => {
            Swal.fire({
              icon: "success",
              text: "Successfully deleted form!",
            });
            getForms();
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Something went wrong!",
              text: "Please try again later.",
            });
          });
      }
    });
  };
  const copyToClipboard = (id) => {
    const url = `${window.location.origin}/form-submit/${id}`;
    window.navigator.clipboard.writeText(url)
  };
  return (
    <>
      <div>
        <div className="flex justify-between">
          <h1>Forms</h1>
          <div>
            <button
              className={css.BTN_PRIM}
              onClick={() => formModal.current.open()}
            >
              Create
            </button>
          </div>
        </div>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="text-left">Form title</th>
              <th className="text-left">Submission Link</th>
              <th className="">Actions</th>
            </tr>
          </thead>
          <tbody>
            {forms?.map((f, i) => (
              <tr key={f?._id || i}>
                <td>{f?.title}</td>
                <td className="text-center">
                  <button
                    className="mx-1"
                    onClick={() => navigate(`/form-submit/${f?._id}`)}
                  >
                    <i className="fa fa-sm fa-paper-plane"></i>
                  </button>
                  <button
                    className="mx-1"
                    onClick={() => copyToClipboard(f?._id)}
                  >
                    <i className="fa fa-sm fa-clipboard"></i>
                  </button>
                </td>
                <td className="text-center">
                  <button
                    className="mx-1"
                    onClick={() => formModal.current.open(f._id)}
                  >
                    <i className="fa fa-pen fa-sm"></i>
                  </button>
                  <button
                    className="mx-1"
                    onClick={() => deleteSingleForm(f?._id)}
                  >
                    <i className="fa fa-trash fa-sm"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <AddEditForm ref={formModal} onSuccess={() => getForms()} />
      </div>
    </>
  );
};
