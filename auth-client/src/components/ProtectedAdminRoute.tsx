import React, { useContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";
import { NotificationContext } from "../context/NotificationContext";

export const ProtectedAdminRoute: React.FC = () => {
  const { user } = useAuth0();
  const { pushNotification } = useContext(NotificationContext);

  useEffect(() => {
    if (
      (user?.["https://client-app.com/roles"] as string[]).includes("admin") ===
      false
    ) {
      pushNotification({
        message: "You are not authorized to view this page",
        type: "error",
      });
    }
  }, [user]);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  if (
    !user ||
    (user?.["https://client-app.com/roles"] as string[]).includes("admin") ===
      false
  ) {
    return <Navigate to="/auth" />;
  }

  return <Outlet />;
};
