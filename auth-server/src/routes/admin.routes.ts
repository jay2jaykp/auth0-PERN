import { Router } from "express";

const adminRoutes = Router();

adminRoutes.get("/", (req, res) => {
  res.send("Hello World!");
});
