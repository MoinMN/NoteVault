export interface JwtUserPayload {
  userId: string;
  email: string;
  name: string;
  role: "user" | "admin";
}