import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ProtectedPage = ({
  children,
  needLogin = false,
  guestOnly = false,
}) => {
  let user;
  try {
    user = JSON.parse(localStorage.getItem("auth"));
  } catch (err) {
    console.log(err);
  }
  const nav = useNavigate();
  useEffect(() => {
    if (needLogin && !user?.id) return nav(`/login`);
    // else if (guestOnly) return nav("/dashboard");
  }, [children]);

  return children;
};
