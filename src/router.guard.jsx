import { Navigate, Outlet } from "react-router";
import { getCurrentUser, isAuthenticated } from './services/auth.service';

export default function RouterGuard({ allowedRoles }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  const user = getCurrentUser();

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}