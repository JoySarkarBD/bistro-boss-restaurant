import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Shared/Footer/Footer";
import Nav from "../components/Shared/Navbar/Nav";

const Main = () => {
  const location = useLocation();

  const noHeaderFooter =
    location.pathname.includes("/register") ||
    location.pathname.includes("/login") ||
    location.pathname.includes("/forget-password") ||
    location.pathname.includes("/reset-password") ||
    location.pathname.includes("/verify-otp") ||
    location.pathname.includes("/update-profile");
  return (
    <div>
      {noHeaderFooter || <Nav />}
      <Outlet />
      {noHeaderFooter || <Footer />}
    </div>
  );
};

export default Main;
