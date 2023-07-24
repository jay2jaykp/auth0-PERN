import axios from "axios";

export const auth0Api = axios.create({
  baseURL: `https://${process.env.AUTH0_DOMAIN}`,
  headers: {
    "Content-Type": "application/json",
  },
});
