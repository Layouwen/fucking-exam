import { User } from "../module";
import { PartialPart } from "../utils";

export interface CreateUserDto
  extends PartialPart<User, "username" | "password" | "nickname" | "sex"> {}
