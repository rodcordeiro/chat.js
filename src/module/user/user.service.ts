import { color } from "../../utils/logger";
import { User } from "./user.entity";
export class UserService {
  render(user: User): void {
    console.log(color.magentaBright(`==> ${user.name} joined the server <==`));
  }
}
