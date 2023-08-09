import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Redirect() {
  const nav = useNavigate();
  useEffect(() => nav(`/home`), []);
}
