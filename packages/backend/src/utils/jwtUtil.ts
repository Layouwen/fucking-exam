import jwt, { JsonWebTokenError } from "jsonwebtoken";
import config from "../config";

class JwtUtil {
  verifyToken(token: string): true | JsonWebTokenError {
    try {
      jwt.verify(token, config.jwt.secret);
      return true;
    } catch (err) {
      throw err;
    }
  }

  createToken(data: { email: string; id: number }): string {
    return jwt.sign(data, config.jwt.secret, { expiresIn: "1d" });
  }

  decodeToken(token: string): any {
    return jwt.decode(token);
  }
}

export default new JwtUtil();
