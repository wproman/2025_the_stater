import express, { Application, NextFunction, Request, Response } from "express";
// import morgan from 'morgan';
// import cors from 'cors';
// import helmet from 'helmet';
// Middlewares
// app.use(helmet());
// app.use(cors({ origin: process.env.CLIENT_URL || '*', credentials: true }));
// app.use(morgan('dev'));
const app: Application = express();
app.use(express.json());

// Sample Route
app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "API Working with MongoDB 🚀" });
});

// Global Error Handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("❌", err.message);
  res.status(500).json({ error: err.message });
});

// Export the app for use in server.ts
export default app;
