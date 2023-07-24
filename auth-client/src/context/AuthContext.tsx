import { useAuth0 } from "@auth0/auth0-react";
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { NotificationContext } from "./NotificationContext";

export const AuthContext = createContext<{
  token: string | null;
}>({
  token: null,
});

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { pushNotification } = useContext(NotificationContext);
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);

  const getToken = async () => {
    const token = await getAccessTokenSilently();
    setToken(token);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      setToken(null);
      // navigate("/auth");
    } else {
      void getToken();
      pushNotification({
        message: "You are logged in",
        type: "success",
      });
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ token }}>{children}</AuthContext.Provider>
  );
};