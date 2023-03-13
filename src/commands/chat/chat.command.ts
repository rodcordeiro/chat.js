import BaseCommand from "../../core/base.command";
import { info, success, error, color } from "../../utils/logger";
import config from "../../utils/config";
import { adapter } from "../../socket/adapter";
import { createInterface, Interface } from "readline";
import { User } from "../../module/user/user.entity";
import { UserService } from "../../module/user/user.service";
import { Message } from "../../module/message/message.entity";
import { MessageService } from "../../module/message/message.service";
interface Options {
  username: string;
}

export default class ConfigCommand extends BaseCommand {
  lastMessageId: string = "";
  private reader: Interface = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  constructor() {
    super({
      name: "connect",
      description: "Connect to server",
      usage: "connect",
      alias: "con",
    });
  }

  public async run(options: Options): Promise<void> {
    this.execute(options);
  }

  private async execute(options: Options): Promise<void> {
    try {
      const user = config.get("user.username");
      if (!user) {
        console.error("User not registered!");
        process.exit(1);
      }
      adapter.on("connect", () => {
        const socketId = adapter.id;
        const author: User = {
          _id: socketId,
          name: String(user),
        };
        adapter.emit("user_joining", author);
        this.chat(author);
        adapter.on("user_joining", (user: User) => {
          if (user._id !== author._id) new UserService().render(user);
        });
        adapter.on("message", (message: Message) => {
          if (message._id !== this.lastMessageId)
            new MessageService().render(message, author === message.author);
        });
        console.info(color.greenBright("==> connected <=="));
      });
    } catch (err) {
      console.error(error(err));
    }
  }
  private chat(author: User) {
    // this.reader.question("» ", (answer) => {
    this.reader.question(" ", (answer) => {
      if (!answer || answer === "") return this.chat(author);
      const messageId = new MessageService().dispatch(author, answer);
      this.lastMessageId = messageId;
      this.chat(author);
    });
  }
}
