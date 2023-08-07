import { Children, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ProtectedPage = ({
  Children,
  needLogin = false,
  guestOnly = false,
}) => {
  const user = JSON.parse(localStorage.getItem("auth"));
  const nav = useNavigate();

  useEffect(() => {
    if (needLogin && !user.id) return nav("/login");
    //
    else if (guestOnly && user.id) return nav("/");
  }, [Children]);

  return Children;
};

//memproteksi page
// kapan dapat diakses dan kapan tidak bisa diakses