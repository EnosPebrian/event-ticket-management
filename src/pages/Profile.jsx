import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { types } from "../redux/types";

export const Profile = () => {
  const userSelector = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const auth = localStorage.getItem("auth");

  //   dispatch({
  //     type: types.login,
  //     payload: { ...auth },
  //   });

  return (
    <>
      <center>Hello</center>
    </>
  );
};
