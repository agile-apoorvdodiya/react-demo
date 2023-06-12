import { css } from "../../constants/classes";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddEditForm } from "./components/add-edit-form";

export const FormsList = (props) => {
  const forms = useSelector((s) => s?.forms?.formList);
  const formModal = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    // api call
    
  }, []);

  return (
    <>
      <div>
        <div className="flex justify-between">
          <h1>Forms</h1>
          <div>
            <button className={css.BTN_PRIM} onClick={() => formModal.current.open()}>Create</button>
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
            {forms?.map((u, i) => (
              <tr key={u?._id || i}>
                <td>{u?.name}</td>
                <td>{u?.contact}</td>
                <td>{u?.email}</td>
                <td>
                  {!u?.admin ? (
                    <i className="fa fa-times fa-sm"></i>
                  ) : (
                    <i className="fa fa-check fa-sm"></i>
                  )}
                </td>
                <td className="text-center">
                  <button className="mx-1">
                    <i className="fa fa-eye fa-sm"></i>
                  </button>
                  <button className="mx-1">
                    <i className="fa fa-pen fa-sm"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <AddEditForm ref={formModal} onSuccess={() => {}} />
      </div>
    </>
  );
};
