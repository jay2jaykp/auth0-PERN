import { Router } from "express";
import { prisma } from "../utils/prisma";
import { authMiddleware } from "../middleware/auth.middleware";
import { userinfoMiddleware } from "../middleware/userinfo.middleware";
import { verifyUserMiddleware } from "../middleware/verifyUser.middleware";
import { requiredScopes } from "express-oauth2-jwt-bearer";

export const todoRoutes = Router();

todoRoutes.use(authMiddleware);
todoRoutes.use(userinfoMiddleware);
todoRoutes.use(verifyUserMiddleware);

todoRoutes.get("/", async (req, res) => {
  try {
    const { email, sub: auth0Id } = req.body.user || req.headers.user;
    const data = await prisma.toDO.findMany({
      where: {
        user: {
          email,
          auth0Id,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.send(data);
  } catch (error) {
    console.log(
      "🚀 ~ file: todo.routes.ts:18 ~ todoRoutes.get ~ error:",
      error
    );
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
});

todoRoutes.post("/", async (req, res) => {
  try {
    const data = await prisma.toDO.create({
      data: {
        title: req.body.title,
        user: {
          connect: {
            email_auth0Id: {
              email: req.body.user.email,
              auth0Id: req.body.user.sub,
            },
          },
        },
      },
    });
    res.status(201).send({
      message: "Todo created successfully",
      data,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: todo.routes.ts:42 ~ todoRoutes.post ~ error:",
      error
    );
    res.status(500).json({
      message: "Something went wrong lol",
      error,
    });
  }
});

todoRoutes.put("/done/:id", async (req, res) => {
  try {
    const data = await prisma.toDO.update({
      where: {
        id: req.params.id,
        user: {
          email: req.body.user.email,
        },
      },
      data: {
        completed: true,
      },
    });
    console.log("🚀 ~ file: todo.routes.ts:81 ~ todoRoutes.put ~ data:", data);
    res.send({
      message: "Todo updated successfully",
      data,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: todo.routes.ts:87 ~ todoRoutes.put ~ error:",
      error
    );
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
});

todoRoutes.put("/undone/:id", async (req, res) => {
  try {
    const data = await prisma.toDO.update({
      where: {
        id: req.params.id,
        user: {
          email: req.body.user.email,
        },
      },
      data: {
        completed: false,
      },
    });
    console.log("🚀 ~ file: todo.routes.ts:111 ~ todoRoutes.put ~ data:", data);
    res.send({
      message: "Todo updated successfully",
      data,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: todo.routes.ts:87 ~ todoRoutes.put ~ error:",
      error
    );
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
});

todoRoutes.delete("/:id", async (req, res) => {
  const data = await prisma.toDO.delete({
    where: {
      id: req.params.id,
      user: {
        email: req.body.user.email,
      },
    },
  });
  res.json(data);
});
