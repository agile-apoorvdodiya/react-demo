import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../pages/login/login";
import { Users } from "../pages/users/users";
import { UserDetails } from "../pages/user-details/user-details";
import { FormsList } from "../pages/forms/form-list";
import { Layout } from "../components/layout";
import { AuthGuard } from "../components/auth-guard";
import { FormSubmit } from "../pages/form-submit/form-submit";
import { setUser } from "../redux/slices/auth";
import { useEffect } from "react";

export const AppRoutes = (props) => {
  const dispatch = useDispatch();
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/form-submit/:id" element={<FormSubmit />} />
      <Route
        path="/"
        element={
          <AuthGuard>
            <Layout />
          </AuthGuard>
        }
      >
        <Route path="users" element={<Users />} />
        <Route path="users/:id" element={<UserDetails />} />
        <Route path="forms" element={<FormsList />} />
      </Route>
      <Route path="*" element={<Navigate replace to="/users" />}></Route>
    </Routes>
  );
};
