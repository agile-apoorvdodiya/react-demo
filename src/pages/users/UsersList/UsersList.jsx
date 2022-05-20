import { useEffect, useState } from "react";
import * as userService from "../../../helper/user.service";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
export const UsersList = (props) => {
  const [users, setUsers] = useState([]);
  const getAllUsers = () => {
    userService.getAllUsers().then((res) => {
      console.log(res);
      setUsers(res.data.users);
    });
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  const clickHandler = (e) => {
    console.log("clicked");
    props.onSomeEvent({ foo: "bar" });
  };

  const deleteUser = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "This operation is irreversible!",
    }).then((res) => {
      if (res.isConfirmed) {
        userService.deleteUserById(id).then((res) => {
          Swal.fire({
            icon: "success",
            title: res?.data?.message,
          }).then(() => {
            getAllUsers()
          });
        });
      }
    });
  };
  return (
    <div className="container">
      <div className="mt-3 d-flex justify-content-between">
        <div className="display-4">Users</div>
        <div>
          <Link to={"/users/create"} className="btn btn-sm btn-outline-primary">
            Create
          </Link>
        </div>
      </div>
      {users.length ? (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Admin</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.contact}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.admin ? (
                        <i className="fa fa-check"></i>
                      ) : (
                        <i className="fa fa-times"></i>
                      )}
                    </td>
                    <td>
                      <button className="btn btn-sm ms-2">
                        <i className="fa fa-file"></i>
                      </button>
                      <Link
                        className="btn btn-sm ms-2"
                        to={"/users/" + user._id}
                      >
                        <i className="fa fa-pencil"></i>
                      </Link>
                      <button
                        className="btn btn-sm ms-2"
                        onClick={() => deleteUser(user._id)}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="fst-italic">No users found</div>
      )}
    </div>
  );
};
