import { Request, Response, NextFunction } from "express";
import { auth } from "express-oauth2-jwt-bearer";

export const authMiddleware = auth({
  audience: "http://test.com",
  issuerBaseURL: "https://dev-ovtpnpypnypi1kbd.us.auth0.com/",
  tokenSigningAlg: "RS256",
});
