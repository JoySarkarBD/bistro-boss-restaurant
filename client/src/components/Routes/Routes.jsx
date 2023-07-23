import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layout/DashboardLayout";
import Main from "../../Layout/Main";
import Cart from "../../pages/Cart/Cart";
import Contact from "../../pages/Contact/Contact";
import ForgetPassword from "../../pages/ForgetPassword/ForgetPassword";
import ResetPassword from "../../pages/ForgetPassword/ResetPassword";
import Home from "../../pages/Home/Home";
import Login from "../../pages/Login/Login";
import Menu from "../../pages/Menu/Menu";
import Product from "../../pages/Product/Product";
import Register from "../../pages/Register/Register";
import Shop from "../../pages/Shop/Shop";
// import UserProfile from "../../pages/UserProfile/UserProfile";
import Profile from "../../pages/Dashboard/Profile/Profile";
import UpdateProfile from "../../pages/Dashboard/UpdateProfile/UpdateProfile";
import VerifyOTP from "../../pages/VerifyOTP/VerifyOTP";
import VerifyUser from "../../pages/VerifyUser/VerifyUser";
import ErrorPage from "../../ui/ErrorPage";
import PersistLoginUser from "../PersistLoginUser/PersistLoginUser";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import PublicRoute from "../PublicRoute/PublicRoute";
import TermsAndCondition from "../TermsAndCondition/TermsAndCondition";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
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
        path: "menu",
        element: <Menu />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "product",
        element: <Product />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        element: <PublicRoute />,
        children: [{ path: "register", element: <Register /> }],
      },
      {
        element: <PublicRoute />,
        children: [{ path: "login", element: <Login /> }],
      },
      {
        path: "forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "verify-otp",
        element: <VerifyOTP />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "verifyUser/:userId",
        element: <VerifyUser />,
      },
      {
        path: "termsAndCondition",
        element: <TermsAndCondition />,
      },
    ],
  },

  {
    element: <PersistLoginUser />,
    children: [
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "dashboard/",
            element: <DashboardLayout />,
            errorElement: <ErrorPage />,
            children: [
              {
                path: "ecommerce",
                element: <Product />,
              },
            ],
          },
        ],
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "profile/update-profile",
        element: <UpdateProfile />,
      },
    ],
  },
]);

export default router;
