declare namespace NodeJS {
  interface ProcessEnv {
    MONGO_URI: string;
    PORT: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    DEV_EMAIL: string;
    SMTP_HOST: string;
    SMTP_USER: string;
    SMTP_PASS: string;
    SMTP_PORT: string;
    SMTP_SECURE: string;
  }
}
