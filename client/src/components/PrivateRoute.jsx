import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
  // Get the current user from the Redux store
  const { currentUser } = useSelector((state) => state.user);

  // Render the child routes if a user is logged in, otherwise redirect to sign-in page
  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
}
