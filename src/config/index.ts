import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

interface EnvConfig {
  port: string | undefined;
  database_url: string | undefined;
  node_env: string | undefined;
}

export const config: EnvConfig = {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  node_env: process.env.NODE_ENV,
};
