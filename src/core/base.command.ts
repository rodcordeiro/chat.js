interface Options {
  argument: string;
  description: string;
}
// .option('-t,--title [text]', 'The task title')

interface BaseCommandOptions {
  name: string;
  description: string;
  usage: string;
  alias?: string;
  options?: Options[];
}

class BaseCommand {
  private readonly name: string;
  private readonly description: string;
  private readonly usage: string;
  private readonly alias: string;
  private readonly options: Options[];

  constructor(commandOptions: BaseCommandOptions) {
    const { name, description, usage, alias, options } = commandOptions;
    this.name = name;
    this.description = description;
    this.usage = usage;
    this.options = options ?? [];
    this.alias = alias ?? this.name[0];
  }

  public async run(_options?: { [k: string]: any }): Promise<void> {}

  public getName(): string {
    return this.name;
  }

  public getDescription(): string {
    return this.description;
  }

  public getUsage(): string {
    return this.usage;
  }

  public getAlias(): string {
    return this.alias;
  }

  public getOptions(): Options[] {
    return this.options;
  }
}

export default BaseCommand;
