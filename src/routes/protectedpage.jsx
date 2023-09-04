import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const ProtectedPage = ({
  children,
  needLogin = false,
  guestOnly = false,
}) => {
  const token = localStorage.getItem("auth");
  const nav = useNavigate();
  useEffect(() => {
    if (needLogin && !token) return nav(`/login`);
  }, [children]);

  return children;
};
