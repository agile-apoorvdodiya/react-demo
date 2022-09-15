import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

export const AuthGuard = (props) => {
  const authDetails = useSelector((s) => s.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authDetails || !authDetails.user || !authDetails.token)
      navigate("login", { replace: true });
  }, [authDetails.user, authDetails.token, navigate]);

  return <>{props.children}</>;
};
