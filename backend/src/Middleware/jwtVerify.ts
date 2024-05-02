import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ObjectId } from "mongodb";

declare global {
  namespace Express {
    interface Request {
      id?: ObjectId;
    }
  }
}
export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader =
    req.headers.authorization || (req.headers.Authorization as string);
  if (!authHeader?.startsWith("Bearer "))
    return res.status(401).json({ message: "Unauthorized no token provided." });
  const token = authHeader.split(" ")[1];
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    (err, decoded) => {
      if (err || !decoded) return res.sendStatus(403);
      req.id = (decoded as JwtPayload).id as ObjectId;
      next();
    }
  );
};
