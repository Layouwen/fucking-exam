import { Request, Response, NextFunction } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { jwtUtil } from "../utils";

function getBearerAndToken(authorization: string) {
  const [bearer, token] = authorization!.split(" ");
  return { bearer, token };
}

function hasBearerToken(req: Request) {
  const { authorization } = req.headers;
  if (!authorization) {
    return false;
  }

  const { bearer, token } = getBearerAndToken(authorization);
  return !(bearer !== "Bearer" || !token);
}

export default (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.json({
      msg: "No authorization header found",
    });
    return;
  }

  if (!hasBearerToken(req)) {
    res.json({
      msg: "No bearer token found",
    });
    return;
  }

  const { token } = getBearerAndToken(authorization);
  try {
    jwtUtil.verifyToken(token);
    const payload = jwtUtil.decodeToken(token);
    console.log(payload, "payload");
    next();
    // @ts-ignore
  } catch (err: JsonWebTokenError) {
    switch (err.name) {
      case "TokenExpiredError":
        res.json({
          msg: "Token has expired",
        });
        return;
      case "JsonWebTokenError":
        res.json({
          msg: "Token is not valid",
        });
        return;
      default:
        res.json({
          msg: "sorry, unknown error",
        });
    }
  }
};
