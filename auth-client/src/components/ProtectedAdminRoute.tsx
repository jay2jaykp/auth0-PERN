import React, { useContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";
import { NotificationContext } from "../context/NotificationContext";

export const ProtectedAdminRoute: React.FC = () => {
  const { user, getIdTokenClaims } = useAuth0();
  const { pushNotification } = useContext(NotificationContext);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  if (!user) {
    return <Navigate to="/auth" />;
  }

  return <Outlet />;
};
