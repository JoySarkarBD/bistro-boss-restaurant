import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const VerifyUser = () => {
  const { userId } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    async function veriFiedEmail() {
      try {
        const { data } = await axios.put(
          `http://localhost:5000/api/v1/verify-email/${userId}`
        );

        if (data?.status === "success") {
          navigate("/update-profile", { state: data });
        } else {
          navigate("/");
        }

        // console.log(data.);
      } catch (error) {
        console.log(error);
      }
    }
    veriFiedEmail();
  }, [navigate, userId]);
};

export default VerifyUser;
