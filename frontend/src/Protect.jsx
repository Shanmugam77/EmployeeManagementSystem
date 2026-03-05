import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const Protect = () => {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default Protect;