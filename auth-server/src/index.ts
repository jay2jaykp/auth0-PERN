import express from "express";
import cors from "cors";
import morgan from "morgan";
import { todoRoutes } from "./routes/todo.routes";
import { errorHandler } from "./middleware/errorHandler.middleware";
import { authRoutes } from "./routes/auth.routes";

const app = express();

app.use(cors());
// app.use(morgan("dev"));
app.use(express.json());

app.use("/todos", todoRoutes);

app.use("/auth", authRoutes);

// app.use(errorHandler);

app.listen(4000, () => {
  console.log("Server is listening on port 4000");
});
