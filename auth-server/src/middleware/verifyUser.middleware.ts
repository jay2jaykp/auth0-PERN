import { Request, Response, NextFunction } from "express";
import { prisma } from "../utils/prisma";

export const verifyUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, name, sub: auth0Id } = req.body.user || req.headers.user;
    const data = await prisma.user.findUnique({
      where: {
        email_auth0Id: {
          email,
          auth0Id,
        },
      },
    });
    if (!data) {
      await prisma.user.create({
        data: {
          auth0Id,
          email,
          name,
        },
      });
    }

    next();
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong",
      error,
    });
  }
};
