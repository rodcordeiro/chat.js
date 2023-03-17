#!/usr/bin/env node

import { program as cli } from "./utils/core";
import UpdateNotifier from "update-notifier";
import { info, color } from "./utils/logger";
import pkg from "../package.json";
import { CommandFactory } from "./utils/CommandFactory";

import { config } from "dotenv";
config();
import "./socket/adapter";

if (process.env.NODE_ENV !== "development") {
  // @ts-ignore
  const notifier = new UpdateNotifier({
    pkg,
    shouldNotifyInNpmScript: true,
  });
  notifier.fetchInfo();
  if (notifier.update) {
    console.log(`Update available: ${notifier.update.latest}`);
  }
}

cli
  .version(pkg.version, "-v,--version", "Shows cli version")
  .allowUnknownOption(false)
  .allowExcessArguments(false);

for (const command of CommandFactory.values()) {
  const cmd = cli.command(command.getUsage());

  cmd.alias(command.getAlias()).description(command.getDescription());
  if (command.getOptions().length) {
    for (const option of command.getOptions()) {
      cmd.option(option.argument, option.description);
    }
  }
  cmd.action(async (options: { [k: string]: any }) => {
    try {
      await command.run(options);
    } catch (error) {
      console.log(error);
      cli.outputHelp();
    }
  });
}

// add some useful info on help
cli.on("--help", () => {
  console.log(
    `${info("[i]")} Run ${color.cyan(
      `chat <command> --help`
    )} for detailed usage of given command.`
  );
});

cli.showHelpAfterError();
cli.parse(process.argv);

// if (!process.argv.slice(2).length) {
//   cli.outputHelp();
// }
