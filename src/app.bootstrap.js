import { NODE_ENV, port } from "../config/config.service.js";
import { authenticateDB, sequelize } from "./DB/connection.db.js";
import {
  authRouter,
  postRouter,
  userRouter,
  commentRouter,
} from "./modules/index.js";
import express from "express";

async function bootstrap() {
  const app = express();
  //convert buffer data
  app.use(express.json());
  //application routing
  authenticateDB();

  await sequelize.sync({ alter: false, force: false, match: /_test$/ });
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/posts", postRouter);
  app.use("/comments", commentRouter);
  //invalid routing
  app.use("{/*dummy}", (req, res) => {
    return res.status(404).json({ message: "Invalid application routing" });
  });

  //error-handling
  app.use((error, req, res, next) => {
    const status = error.cause?.status ?? 500;
    return res.status(status).json({
      error_message:
        status == 500
          ? "something went wrong"
          : (error.message ?? "something went wrong"),
      stack: NODE_ENV == "development" ? error.stack : undefined,
    });
  });

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
}
export default bootstrap;
