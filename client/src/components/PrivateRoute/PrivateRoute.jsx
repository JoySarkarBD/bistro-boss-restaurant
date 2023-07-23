import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const location = useLocation();
  const auth = useSelector((state) => state.auth);

  if (auth.accessToken) return <Outlet />;
  return <Navigate to='/login' replace state={{ location }} />;
};

export default PrivateRoute;
