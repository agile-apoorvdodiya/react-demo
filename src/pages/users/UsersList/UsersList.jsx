import { useEffect, useState } from "react";
import * as userService from "../../../helper/user.service";

export const UsersList = (props) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    userService.getAllUsers().then((res) => {
      console.log(res);
      setUsers(res.data.users);
    });
  }, []);

  const clickHandler = (e) => {
    console.log("clicked");
    props.onSomeEvent({ foo: "bar" });
  };
  return (
    <div className="container">
      <div className="display-4 mt-3">Users</div>
      {users.length ? (
        <div className="table-responsive">
          <table className="table table-striped">
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
                      <button className="btn btn-sm">
                        <i className="fa fa-eye"></i>
                      </button>
                      <button className="btn btn-sm">
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
