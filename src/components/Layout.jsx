import { Header } from "./Header";
import { Route, Routes, Navigate } from "react-router-dom";
import { UsersList } from "../pages/users/UsersList/UsersList";
import { EditUser } from "../pages/users/EditUser/EditUser";
import { FormBuilder } from "../pages/form-builder/form-builder";
import { CreateEdit } from "../pages/form-builder/create-edit/create-edit";
import "./layout.css";

export const Layout = (props) => {
  const eventHandler = (data) => {
    console.log(data);
  };
  return (
    <div>
      <Header
        handleLogout={() => {
          props.handleLogout({ status: false });
        }}
      ></Header>
      <div className="container">
        <Routes>
          <Route path="users">
            <Route path="" element={<UsersList onSomeEvent={eventHandler} />} />
            <Route path="create" element={<EditUser />} />
            <Route path=":id" element={<EditUser />} />
          </Route>
          <Route path="form-builder">
            <Route path="" element={<FormBuilder />} />
            <Route path="create" element={<CreateEdit />} />
          </Route>
          <Route element={<Navigate to="/users" />} />
        </Routes>
      </div>
    </div>
  );
};
