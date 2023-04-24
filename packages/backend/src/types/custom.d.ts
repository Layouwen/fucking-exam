import { Request } from "express";

declare global {
  namespace Express {
    export interface Request {
      user: {
        email: string;
        id: number;
        iat: number;
        exp: number;
      };
      session: {
        [key: string]: any;
      };
    }
  }
}

export interface IRequest<P = any, B = any> extends Request<P, any, B> {}

export interface CurdIntl<A = any, W = any> {
  create(data: any): Promise<A | null>;

  // delete(): Promise<any>;
  update(where: W, data: Partial<A>): Promise<any>;

  findOne(where: W, excludeField: string[]): Promise<A | null>;

  findAll(where: W, excludeFields: string[]): Promise<A[] | null>;
}
