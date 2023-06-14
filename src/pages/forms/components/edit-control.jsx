import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Modal } from "../../../components/modal";
import { css } from "../../../constants/classes";
import { useFormik } from "formik";

export const EditControl = forwardRef((props, ref) => {
  const [control, setControl] = useState(null);
  const [id, setId] = useState(null);

  useImperativeHandle(ref, () => ({
    open: (control, id) => {
      setControl(control);
      controlForm.setValues(control);
      setId(id);
      modal.current.open();
    },
  }));
  const modal = useRef();
  const controlForm = useFormik({
    initialValues: {
      label: "",
      placeholder: "",
      controls: [],
    },
    onSubmit: (value) => {
      props.onSuccess(id, {
        ...control,
        ...value,
        name: `${Date.now()}-${control.type}`,
      });
      modal.current.close();
    },
  });
  const deleteControl = (index) => {
    const updatedControls = [...controlForm.values.controls];
    updatedControls.splice(index, 1);
    controlForm.setFieldValue("controls", updatedControls);
  };
  const addControl = () => {
    const updatedControls = controlForm.values.controls;
    updatedControls.push({
      label: "",
      value: "",
    });
    controlForm.setFieldValue('controls', updatedControls);
  };
  return (
    <Modal
      ref={modal}
      header="Edit form control"
      onModalSubmit={controlForm.handleSubmit}
    >
      <table className="table-auto w-full border border-gray-500">
        <tbody>
          <tr>
            <td className="p-2">Type</td>
            <td className="p-2">{control?.labelView}</td>
          </tr>
          <tr>
            <td className="p-2">Label</td>
            <td className="p-2">
              <input
                className={css.INPUT_TEXT}
                type="text"
                placeholder="Enter display label"
                name="label"
                value={controlForm.values.label}
                onChange={controlForm.handleChange}
              />
            </td>
          </tr>
          {!["checkbox", "radio"].includes(controlForm.values.type) ? (
            <tr>
              <td className="p-2">Placeholder</td>
              <td className="p-2">
                <input
                  className={css.INPUT_TEXT}
                  type="text"
                  placeholder="Enter placeholder for the input"
                  name="placeholder"
                  value={controlForm.values.placeholder}
                  onChange={controlForm.handleChange}
                />
              </td>
            </tr>
          ) : (
            <tr className="border">
              <td className="w-full">
                <table className="border table table-auto w-full">
                  <tbody>
                    <tr>
                      <td>Options</td>
                      <td>
                        <button onClick={() => addControl()}>
                          <i className="fa fa-plus"></i>
                        </button>
                      </td>
                    </tr>
                    {controlForm.values.controls.map((c, index) => (
                      <tr key={`sub-control-${index}`}>
                        <td>
                          <input
                            className={css.INPUT_TEXT}
                            style={{ width: "100px" }}
                            placeholder="Label"
                            type="text"
                            name={`controls[${index}.label]`}
                            onChange={controlForm.handleChange}
                            value={controlForm.values.controls[index]?.label}
                          />
                        </td>
                        <td>
                          <input
                            className={css.INPUT_TEXT}
                            style={{ width: "100px" }}
                            placeholder="Label"
                            type="text"
                            name={`controls[${index}].value`}
                            onChange={controlForm.handleChange}
                            value={controlForm.values.controls[index]?.value}
                          />
                        </td>
                        <td>
                          <button onClick={() => deleteControl(index)}>
                            <i className="fa fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Modal>
  );
});
