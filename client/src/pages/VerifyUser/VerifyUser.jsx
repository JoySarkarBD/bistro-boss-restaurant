import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const VerifyUser = () => {
    const { userEmail } = useParams();
    console.log(userEmail);
    const navigate = useNavigate();
    useEffect(() => {
      async function veriFiedEmail() {
        try {
          const { data } = await axios.get(
            `http://localhost:5000/api/v1/verifiedUser/${userEmail}`
          );
  
  
          console.log(data.status);
          if (data?.status === "success") {
            navigate("/update-profile", { state: data?.status });
          } else {
            navigate("/", { state: data?.status });
          }
  
          // console.log(data.);
        } catch (error) {
          console.log(error);
        }
      }
      veriFiedEmail();
    }, [navigate,userEmail]);
  
    return (
      <div>
        <>
          <h1>Verified user</h1>
        </>
      </div>
    );
};

export default VerifyUser;