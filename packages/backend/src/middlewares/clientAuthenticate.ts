import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { jwtUtil, ResponseError } from "../utils";

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
    res.json(
      new ResponseError({
        msg: "No authorization header found",
        code: 499,
      })
    );
    return;
  }

  if (!hasBearerToken(req)) {
    res.json(
      new ResponseError({
        msg: "No bearer token found",
        code: 499,
      })
    );
    return;
  }

  const { token } = getBearerAndToken(authorization);
  try {
    jwtUtil.verifyToken(token);
    // @ts-ignore TODO
    req.user = jwtUtil.decodeToken(token);
    next();
    // @ts-ignore
  } catch (err: JsonWebTokenError) {
    switch (err.name) {
      case "TokenExpiredError":
        res.json(
          new ResponseError({
            msg: "Token has expired",
            code: 419,
          })
        );
        return;
      case "JsonWebTokenError":
        res.json(
          new ResponseError({
            msg: "Token is not valid",
            code: 498,
          })
        );
        return;
      default:
        res.json(new ResponseError({ msg: "Unknown error" }));
    }
  }
};
