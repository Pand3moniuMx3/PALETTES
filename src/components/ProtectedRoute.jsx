import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import Loader from "./Loader";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. load the authenticated user
  const { isLoading, isAuthenticated } = useUser();

  // 2. if no authenticated user, redicect to login page
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);

  // 3. while loading, show a spinner
  if (isLoading) return <Loader height="100vh" />;

  // 4. if there is a user, render the app
  if (isAuthenticated) return children;
}
