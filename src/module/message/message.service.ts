import { User } from "../user/user.entity";
import { Message } from "./message.entity";
import { v4 as uuid } from "uuid";
import { color } from "../../utils/logger";
import { adapter } from "../../socket/adapter";

export class MessageService {
  dispatch(author: User, content: string): string {
    const _id = uuid();
    adapter.emit("message", {
      _id,
      content: content,
      author: author,
      sent: new Date(),
    });
    return _id;
  }

  render(message: Message, owner = false): void {
    const date = new Date(message.sent).toLocaleTimeString();
    console.log(
      `[${color.greenBright(date)}] ${
        owner
          ? color.magenta(message.author.name)
          : color.green(message.author.name)
      }: ${color.cyanBright(message.content)}`
    );
    process.stdout.write("\u0007");
  }
}
