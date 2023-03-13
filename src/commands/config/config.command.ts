import BaseCommand from "../../core/base.command";
import { createPromptModule } from "inquirer";
import { info, success, error } from "../../utils/logger";
import config from "../../utils/config";

interface Options {
  username: string;
}

export default class ConfigCommand extends BaseCommand {
  constructor() {
    super({
      name: "config",
      description: "Manage user name",
      usage: "config",
      options: [
        {
          argument: "--username <username>",
          description: "The username to be registered",
        },
      ],
    });
  }
  public async run(options: Options): Promise<void> {
    this.execute(options);
  }

  private async execute(options: Options): Promise<void> {
    try {
      let username: string = options.username;
      if (!options || !options.username) {
        const Prompt = createPromptModule();
        const data = await Prompt([
          {
            name: "username",
            type: "input",
            message: `${info("Please, enter your username: ")}`,
            validate: (input: string) => input !== "" && input !== undefined,
          },
        ]);
        username = data.username;
      }

      config.set("user.username", username);
      console.log(success("Username registered successfully!"));
    } catch (err) {
      console.error(error(err));
    }
  }
}
