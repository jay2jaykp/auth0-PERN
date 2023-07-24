import { Request, Response, NextFunction } from "express";
import { auth0Api } from "../utils/axios";

export const adminToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ManagementToken = await auth0Api.post("/oauth/token", {
      client_id: "caKUZCoveJte4uPZN1ITg3OQoiBqiPCK",
      client_secret:
        "zNPjmkyNZtziESnLZirihCOw3cYiDPGoUiIUuvy7F7MJ3Xc6fYTs--Ag9qi4F3hf",
      audience: "https://dev-ovtpnpypnypi1kbd.us.auth0.com/api/v2/",
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
