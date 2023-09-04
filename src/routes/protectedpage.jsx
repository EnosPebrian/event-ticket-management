import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const ProtectedPage = ({
  children,
  needLogin = false,
  guestOnly = false,
}) => {
  const user = useSelector((state) => state.auth);

  const nav = useNavigate();
  useEffect(() => {
    if (needLogin && !user?.id) return nav(`/login`);
    // else if (guestOnly) return nav("/dashboard");
  }, [children]);

  return children;
};
