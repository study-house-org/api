import * as authRouters from "@/api/auth";
import * as graphRouters from "@/api/graph";
import * as profileRouters from "@/api/profile";
import { config, metrics, wrapper } from "@/components";
import { AppError } from "@/errors";
import { Context } from "@/tracing";
import bodyParser from "body-parser";
import express from "express";
import "express-async-errors";
import { authMiddleware } from "./auth/middleware";
import { APINextFunction, APIRequest, APIResponse } from "./types";
import blocker from "express-user-agent-blocker";

const errorHandler = (
  error: Error | AppError,
  req: APIRequest,
  res: APIResponse,
  next: APINextFunction
) => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      code: error.name,
      message: error.message,
      status: error.statusCode,
    });
  } else {
    res.status(500).json({
      code: "UnknownError",
      message: error.message,
      status: "500",
    });
  }

  next();
};

export const init = wrapper(
  { name: "init", file: __filename },
  async (ctx: Context) => {
    const app = express();

    // Security measures
    app.disable("x-powered-by");

    // Config middlewares
    metrics.installApp(app);
    app.use(bodyParser.json());

    // Block some user agents
    app.use(blocker(["Nmap Scripting Engine"]));

    // Block some requests
    app.get("/", (req, res) => {
      res.send();
    });

    // Public endpoints
    app.use("/auth", authRouters.publicRouter);

    // Auth middleware
    app.use(authMiddleware);

    // Private endpoints
    app.use("/auth", authRouters.privateRouter);
    app.use("/graph", graphRouters.privateRouter);
    app.use("/profile", profileRouters.privateRouter);

    app.get("/hello-world", (req, res) => {
      res.json({ hello: "world2" });
    });

    // Error handler
    app.use(errorHandler);

    // Start the server
    const { port } = config.server;

    app.listen(port);

    ctx.log.info(`Server listening on port ${port}`);
  }
);
