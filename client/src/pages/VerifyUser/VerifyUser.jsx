import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../../lib/axios";
import { setCredentials } from "../../Features/auth/authSlice";

const VerifyUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function veriFiedEmail() {
      try {
        const { data } = await axiosInstance.put(
          `/users/verify-email/${userId}`
        );
        if (data.msg === "success" && data?.data?.accessToken) {
          localStorage.setItem("userInfo", JSON.stringify(data?.data.userInfo));
          dispatch(
            setCredentials({
              accessToken: data?.data.accessToken,
              roles: data?.data?.roles,
              userInfo: data?.data?.userInfo,
            })
          );

          navigate("/");
        } else {
          navigate("/");
        }

        // console.log(data.);
      } catch (error) {
        console.log(error);
      }
    }
    veriFiedEmail();
  }, [navigate, userId, dispatch]);
};

export default VerifyUser;
