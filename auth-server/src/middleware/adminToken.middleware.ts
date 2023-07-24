import { Request, Response, NextFunction } from "express";
import { auth0Api } from "../utils/axios";

export const adminToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ManagementToken = await auth0Api.post("/oauth/token", {
      client_id: process.env.BACKEND_CLIENT_ID,
      client_secret: process.env.BACKEND_CLIENT_SECRET,
      audience: process.env.MANAGEMENT_API_AUDIENCE,
      grant_type: "client_credentials",
    });

    req.body.ManagementToken = ManagementToken.data.access_token;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized",
      error,
    });
  }
};
