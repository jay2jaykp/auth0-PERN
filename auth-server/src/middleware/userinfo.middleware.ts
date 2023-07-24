import { Request, NextFunction, Response } from "express";
import { auth0Api } from "../utils/axios";

export const userinfoMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userInfo = await getUserInfo(
      req.headers.authorization?.split(" ")[1] || ""
    );
    if (req.method !== "GET") {
      req.body.user = userInfo;
    } else {
      req.headers.user = userInfo;
    }
    next();
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong in userinfo middleware",
      error,
    });
  }
};

const getUserInfo = async (token: string) => {
  const userInfo = await auth0Api.get("/userinfo", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return userInfo.data;
};
