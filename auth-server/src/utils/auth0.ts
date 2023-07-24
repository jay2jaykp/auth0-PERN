import { ManagementClient } from "auth0";

export const auth0 = new ManagementClient({
  domain: process.env.AUTH0_DOMAIN || "",
  clientId: process.env.BACKEND_CLIENT_ID || "",
  clientSecret: process.env.BACKEND_CLIENT_SECRET || "",
});
