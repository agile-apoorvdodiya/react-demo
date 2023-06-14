import { useDispatch, useSelector } from "react-redux";
import { css } from "../../constants/classes";
import { useEffect, useRef, useState } from "react";
import {
  getUsersDetails,
  postUsersDocument,
} from "../../redux/action-call/users";
import { useParams } from "react-router-dom";
export const UserDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [file, setFile] = useState(null);
  const fileElement = useRef();
  const user = useSelector((s) => s?.users?.userDetails);
  const progress = useSelector((s) => s?.api?.fileUploadProgress);
  useEffect(() => {
    if (params.id) {
      dispatch(getUsersDetails(params.id, {}));
    }
  }, [params]);
  const uploadFile = () => {
    if (file && params.id) {
      const formData = new FormData();
      formData.append("file", file);
      dispatch(postUsersDocument(formData, params.id));
    }
  };
  return (
    <>
      <div>
        <div className="flex justify-between">
          <h1>Users Details</h1>
        </div>
        <div className="flex justify-between p-3">
          <h2>Documents</h2>
          <div className="flex flex-row">
            {file ? (
              <>
                <button className={css.BTN_PRIM} onClick={() => uploadFile()}>
                  Upload
                </button>
                <div className="m-1"></div>
                <button className={css.BTN_PRIM} onClick={() => setFile(null)}>
                  Cancel
                </button>
              </>
            ) : (
              <button
                className={css.BTN_PRIM}
                onClick={() => fileElement.current.click()}
              >
                <input
                  ref={fileElement}
                  type="file"
                  style={{ height: 0, width: 0 }}
                  onChange={(e) => setFile(e.target.files[0])}
                />
                Add
              </button>
            )}
          </div>
        </div>
        <div className="p-3">{progress}</div>
      </div>
    </>
  );
};
