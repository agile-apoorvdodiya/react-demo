import { Header } from "./Header";
import { Route, Routes } from "react-router-dom";
import { UsersList } from "../pages/users/UsersList/UsersList";
import { EditUser } from "../pages/users/EditUser/EditUser";
import "./layout.css";

export const Layout = (props) => {
  const eventHandler = (data) => {
    console.log(data);
  }
  return (
    <div>
      <Header></Header>
      <div className="container">
        <Routes>
          <Route path="users">
            <Route path="" element={<UsersList onSomeEvent={eventHandler} />} />
            <Route path=":id" element={<EditUser />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};
