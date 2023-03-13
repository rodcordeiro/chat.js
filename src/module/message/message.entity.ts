import { User } from "../user/user.entity";

export class Message {
  _id: string;
  content: string;
  author: User;
  sent: Date;
}
