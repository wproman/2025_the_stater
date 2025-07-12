import express, { Application, Request, Response } from "express";

// import morgan from 'morgan';
import cors from "cors";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
import { router } from "./app/routes";

// import helmet from 'helmet';
// Middlewares
// app.use(helmet());

// app.use(morgan('dev'));
const app: Application = express();
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL || "*", credentials: true }));

app.use("/api/v1", router);

// Sample Route
app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "API Working with MongoDB 🚀" });
});

// Global Error Handler
app.use(globalErrorHandler);
// 404 Not Found
app.use(notFound);

// Export the app for use in server.ts
export default app;
