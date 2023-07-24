//  @desc persist login user if the user reload browser

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { useRefreshTokenQuery } from "../../Features/auth/authApiSlice";
import { logout, setCredentials } from "../../Features/auth/authSlice";

const PersistLoginUser = () => {
  const [userData, setUserData] = useState({});
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { data, isLoading, isError, status } = useRefreshTokenQuery(undefined, {
    skip: auth.accessToken,
  });

  // save user data
  useEffect(() => {
    if (!isLoading && !isError) {
      setUserData(data);
    }
  }, [isLoading, data, isError]);

  // dispatch and store data in global state
  useEffect(() => {
    if (userData?.data?.accessToken) {
      const {
        data: { accessToken, roles, userInfo },
      } = userData;
      dispatch(
        setCredentials({
          roles,
          accessToken,
          userInfo,
          loggedIn: true,
        })
      );
    }
  }, [userData, dispatch]);

  // user should log out if not getting a token
  useEffect(() => {
    if (status === "rejected") {
      dispatch(logout());
    }
  }, [dispatch, status]);

  return (
    <>
      {!auth?.accessToken && auth?.userInfo?.email ? "Loading..." : <Outlet />}
    </>
  );
};

export default PersistLoginUser;

{
  /* <>
      {!auth?.accessToken && auth?.userInfo?.email ? (
        "Loading..."
      ) : auth?.accessToken && auth?.userInfo?.email ? (
        <Outlet />
      ) : (
        navigate("/login")
      )}
    </> */
}
