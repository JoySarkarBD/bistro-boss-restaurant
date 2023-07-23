import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useVerifyUserMutation } from "../../Features/auth/authApiSlice";

import { toast } from "react-hot-toast";
import { setCredentials } from "../../Features/auth/authSlice";

const VerifyUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [verifyUser] = useVerifyUserMutation();

  useEffect(() => {
    async function veriFiedEmail() {
      try {
        const response = await verifyUser({ userId }).unwrap();
        if (response.msg === "success" && response?.data?.accessToken) {
          toast.success("Congrats! Your account is verified", {
            duration: 2000,
          });
          localStorage.setItem(
            "userInfo",
            JSON.stringify(response?.data.userInfo)
          );
          localStorage.setItem("loggedIn", true);
          dispatch(
            setCredentials({
              accessToken: response?.data.accessToken,
              roles: response?.data?.roles,
              userInfo: response?.data?.userInfo,
              loggedIn: true,
            })
          );
          navigate("/");
        } else {
          toast.error("Something wrong.....");
        }
        // console.log(data.);
      } catch (error) {
        const errorStatus = [401, 403];
        if (errorStatus.includes(error.status)) {
          toast.error(error.data.err, { duration: 2000 });
          navigate("/");
        }
      }
    }
    veriFiedEmail();
  }, [navigate, userId, dispatch, verifyUser]);
};

export default VerifyUser;
