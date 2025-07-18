import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

interface EnvConfig {
  port: string | undefined;
  database_url: string | undefined;
  node_env: string | undefined;
  secret_key: string | undefined;
  jwt_expiration?: string | undefined;
  superAdminEmail?: string | undefined;
  superAdminPassword?: string | undefined;
  superAdminName?: string | undefined;
  superAdminRole?: string | undefined;
}

export const config: EnvConfig = {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  node_env: process.env.NODE_ENV,
  secret_key: process.env.JWT_SECRET,
  jwt_expiration: process.env.JWT_EXPIRATION,
  superAdminEmail: process.env.SuperAdminEmail,
  superAdminPassword: process.env.SuperAdminPassword,
  superAdminName: process.env.SuperAdminName,
  superAdminRole: process.env.SuperAdminRole,
};
