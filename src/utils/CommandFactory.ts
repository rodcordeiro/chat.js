import type BaseCommand from "../core/base.command";
import { ConfigCommand,ChatCommand } from "../commands";

const CommandFactory = new Map<string, BaseCommand>();

const configCommand = new ConfigCommand();
const chatCommand = new ChatCommand();

CommandFactory.set(configCommand.getName(), configCommand);
CommandFactory.set(chatCommand.getName(), chatCommand);

export { CommandFactory };
