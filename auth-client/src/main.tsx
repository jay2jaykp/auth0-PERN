import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { TenantProvider } from "./context/TenantContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TenantProvider>

    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN as string}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID as string}
      authorizationParams={{
        redirect_uri: import.meta.env.VITE_AUTH0_CALLBACK_URL as string,
        audience: import.meta.env.VITE_AUTH0_AUDIENCE as string,
        // audience: "http://my-secure-backend.com",
      }}
    >
      <App />
    </Auth0Provider>
    </TenantProvider>

  </React.StrictMode>
);
