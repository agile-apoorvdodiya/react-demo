import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../pages/login/login";
import { Users } from "../pages/users/users";
import { Layout } from "../components/layout";
import { AuthGuard } from "../components/auth-guard";
import { setUser } from "../redux/slices/auth";
import { useEffect } from "react";

export const AppRoutes = (props) => {
  const dispatch = useDispatch();
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <AuthGuard>
            <Layout />
          </AuthGuard>
        }
      >
        <Route path="users" element={<Users />} />
      </Route>
      <Route path="*" element={<Navigate replace to="/users" />}></Route>
    </Routes>
  );
};