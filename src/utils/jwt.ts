import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET_KEY = "your-secret-key"; // Keep this secret in production!

export const createToken = (data: object): string => {
  return jwt.sign(data, SECRET_KEY, { expiresIn: "1m" });
};

export const verifyToken = (token: string): string | JwtPayload | null => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (e) {
    console.log(e);
    return null;
  }
};
