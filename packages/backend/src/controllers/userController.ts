import { Request, Response } from "express";
import { CreateUserDto } from "@fucking-exam/shared/dist/cjs";
import { userService } from "../services";
import { IRequest } from "../types";
import { ResponseSuccess } from "../utils";

class UserController {
  async findAll(req: Request, res: Response) {
    const userList = await userService.findAll();

    res.json(new ResponseSuccess({ data: userList }));
  }

  async findOneById(req: IRequest<{ id: string }>, res: Response) {
    const { id } = req.params;

    const user = await userService.findOne({ id: Number(id) });

    res.json(new ResponseSuccess({ data: user }));
  }

  async createUser(req: IRequest<any, CreateUserDto>, res: Response) {
    const data = req.body;

    await userService.create(data);

    res.json(new ResponseSuccess());
  }
}

export default new UserController();
