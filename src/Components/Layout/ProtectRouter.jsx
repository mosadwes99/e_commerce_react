import { Navigate, useLocation, useNavigate } from "react-router-dom";
import AdminstratorLayout from "./AdminstratorLayout";
import Cookies from "universal-cookie";
export default function ProtectRouter({ children }) {
  let location = useLocation();
  let cookie = new Cookies();
  let currentUser = cookie.get("currentUser");
  if (
    currentUser &&
    currentUser.role == "customer" &&
    (location.pathname.includes("cart") ||
      location.pathname.includes("profile") ||
      location.pathname.includes("wishlist") ||
      location.pathname === "/" ||
      location.pathname.includes("shop") ||
      location.pathname.includes("about") ||
      location.pathname.includes("blog") ||
      location.pathname.includes("contact"))
  ) {
    return children;
  } else if (
    currentUser &&
    currentUser.role == "customer" &&
    (location.pathname.includes("adminstrator") ||
      location.pathname.includes("login") ||
      location.pathname.includes("signup") ||
      location.pathname.includes("forget-password"))
  ) {
    return <Navigate to="/" />;
  } else if (
    currentUser &&
    currentUser.role == "admin" &&
    location.pathname.includes("adminstrator")
  ) {
    return <AdminstratorLayout />;
  } else if (
    currentUser &&
    currentUser.role === "admin" &&
    (location.pathname === "/" ||
      location.pathname.includes("shop") ||
      location.pathname.includes("about") ||
      location.pathname.includes("blog") ||
      location.pathname.includes("contact") ||
      location.pathname.includes("cart") ||
      location.pathname.includes("profile") ||
      location.pathname.includes("wishlist") ||
      location.pathname.includes("login") ||
      location.pathname.includes("signup") ||
      location.pathname.includes("forget-password"))
  ) {
    return <Navigate to="/adminstrator" />;
  } else if (
    !currentUser &&
    (location.pathname.includes("login") ||
      location.pathname.includes("signup") ||
      location.pathname.includes("forget-password") ||
      location.pathname === "/" ||
      location.pathname.includes("shop") ||
      location.pathname.includes("about") ||
      location.pathname.includes("blog") ||
      location.pathname.includes("contact"))
  ) {
    return children;
  } else {
    return <Navigate to="/login" state={{path:location.pathname}}/>;
  }
}
