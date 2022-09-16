import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersList } from "../../redux/action-call/users";
import { Modal } from "../../components/modal";
import { AddEditUser } from "./components/add-edit-user";
import { css } from "../../constants/classes";

export const Users = (props) => {
  const dispatch = useDispatch();

  const users = useSelector((s) => s?.users?.userList || []);
  const userModal = useRef();

  useEffect(() => {
    getUsers()    
  }, []);

  const getUsers = () => {
    dispatch(getUsersList());
  };

  return (
    <>
      <div>
        <div className="flex justify-between">
          <h1>Users</h1>
          <div>
            <button className={css.BTN_PRIM} onClick={() => userModal.current.open()}>Create</button>
          </div>
        </div>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="text-left">Name</th>
              <th className="">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((u, i) => (
              <tr key={u?._id || i}>
                <td>{u?.name}</td>
                <td>
                  {u?.admin ? (
                    <i className="fa fa-times fa-sm"></i>
                  ) : (
                    <i className="fa fa-check fa-sm"></i>
                  )}
                </td>
                <td className="text-center">
                  <button className="mx-1">
                    <i className="fa fa-eye fa-sm"></i>
                  </button>
                  <button
                    className="mx-1"
                    onClick={() => userModal.current.open(u._id)}
                  >
                    <i className="fa fa-pen fa-sm"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <AddEditUser ref={userModal} onSuccess={getUsers} />
      </div>
    </>
  );
};
