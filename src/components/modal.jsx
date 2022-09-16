import { forwardRef, useImperativeHandle, useState } from "react";
import { css } from "../constants/classes";

export const Modal = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    close() {
      onclose();
    },
    open() {
      onOpen();
    },
  }));

  const [show, setShow] = useState(props.show);

  const onclose = () => {
    setShow(false);
  };

  const onOpen = () => {
    setShow(true);
  };

  return (
    <>
      {show && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 backdrop-filter backdrop-blur-sm">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 opacity-25 bg-black dark:bg-white" />
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full bg-slate-200 dark:bg-slate-800">
              <div className="flex flex-row justify-between items-center p-4">
                <h3>{props.header || "Modal header"}</h3>
                <div className="cursor-pointer" onClick={() => onclose()}>
                  <i className="fa fa-times"></i>
                </div>
              </div>
              <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                {props.children || "Modal content"}
              </div>
              <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className={css.BTN_PRIM}
                  onClick={() => props.onModalSubmit()}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
});
