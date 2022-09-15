import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersList } from "../../redux/action-call/users";
import { Modal } from "../../components/modal";
import { AddEditUser } from "./components/add-edit-user";

export const Users = (props) => {
  const dispatch = useDispatch();

  const users = useSelector((s) => s?.users?.userList || []);

  useEffect(() => {
    dispatch(getUsersList());
  }, []);

  return (
    <>
      <div>
        <h4>Users</h4>
        <table className="table-auto w-full border">
          <thead>
            <tr>
              <th className="text-left">Name</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((u, i) => (
              <tr key={u?._id || i}>
                <td>{u?.name}</td>
                <td>
                  <button data-modal-toggle="defaultModal">
                    <i className="fa fa-eye fa-sm"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <AddEditUser />
      </div>
    </>
  );
};
