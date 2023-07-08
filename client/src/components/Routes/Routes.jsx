import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import UpdateProfile from "../../pages/UpdateProfile/UpdateProfile";
import VerifyUser from "../../pages/VerifyUser/VerifyUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
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
