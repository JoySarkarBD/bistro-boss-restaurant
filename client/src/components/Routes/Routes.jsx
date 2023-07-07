import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import UpdateProfile from "../../pages/UpdateProfile/UpdateProfile";
import VerifyUser from "../../pages/VerifyUser/VerifyUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "update-profile",
        element: <UpdateProfile />,
      },
      {
        path: "verifyUser/:userEmail",
        element: <VerifyUser />,
      },
    ],
  },
]);

export default router;
