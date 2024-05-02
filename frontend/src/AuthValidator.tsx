import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./Hooks/useAuth";

function AuthValidator() {
  const { auth } = useAuth();
  return auth?.token ? <Navigate to="/" replace /> : <Outlet />;
}

export default AuthValidator;
