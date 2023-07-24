import React, { useContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";
import { NotificationContext } from "../context/NotificationContext";

export const ProtectedRoute: React.FC = () => {
  const { user } = useAuth0();
  const { pushNotification } = useContext(NotificationContext);

  useEffect(() => {
    if (!user) {
      pushNotification({
        message: "Please log in first",
        type: "error",
      });
    }
  }, [user, pushNotification]);

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return <Outlet />;
};
