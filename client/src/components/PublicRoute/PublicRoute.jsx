import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const auth = useSelector((state) => state.auth);
  if (!auth.accessToken) return <Outlet />;
  return <Navigate to='/' replace />;
};

export default PublicRoute;
