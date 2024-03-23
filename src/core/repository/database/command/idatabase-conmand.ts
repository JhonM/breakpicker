export interface IDatabaseCommand {
  execute(commandName: string): void;
}
