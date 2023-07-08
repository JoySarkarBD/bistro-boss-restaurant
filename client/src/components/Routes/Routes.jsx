import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Home from "../../pages/Home/Home";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import UpdateProfile from "../../pages/UpdateProfile/UpdateProfile";
import VerifyUser from "../../pages/VerifyUser/VerifyUser";
import ErrorPage from "../../ui/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement:<ErrorPage/>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "update-profile",
        element: <UpdateProfile />,
      },
      {
        path: "verifyUser/:userId",
        element: <VerifyUser />,
      },
    ],
  },
]);

export default router;
