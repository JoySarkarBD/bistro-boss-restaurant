import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Cart from "../../pages/Cart/Cart";
import Contact from "../../pages/Contact/Contact";
import Home from "../../pages/Home/Home";
import Login from "../../pages/Login/Login";
import Menu from "../../pages/Menu/Menu";
import Product from "../../pages/Product/Product";
import Register from "../../pages/Register/Register";
import Shop from "../../pages/Shop/Shop";
import UpdateProfile from "../../pages/UpdateProfile/UpdateProfile";
import VerifyUser from "../../pages/VerifyUser/VerifyUser";
import ErrorPage from "../../ui/ErrorPage";

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
