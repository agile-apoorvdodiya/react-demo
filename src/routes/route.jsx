import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../pages/login/login";
import { Users } from "../pages/users/users";
import { Layout } from "../components/layout";

export const AppRoutes = (props) => {
  const authDetails = useSelector((s) => s.auth);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route path="users" element={<Users />} />
      </Route>
      <Route path="*" element={<Navigate replace to="/users" />}></Route>
    </Routes>
  );
};
