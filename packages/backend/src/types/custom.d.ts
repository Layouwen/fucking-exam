import { Request } from 'express';

declare global {
  namespace Express {
    export interface Request {
      user: {
        email: string
        id: number
        iat: number
        exp: number
      };
    }
  }
}


export interface IRequest<P = any, B = any> extends Request<P, any, B> {}

