import { ICommand } from "./icommand";

export default class CommandManager {
  #commands: { [id: string]: ICommand };

  constructor() {
    this.#commands = {};
  }

  register(commandName: string, command: ICommand) {
    this.#commands[commandName] = command;
  }

  executeCommand(command: string | ICommand) {
    if (typeof command === "string") {
      this.#commands[command].execute();
    } else {
      command.execute();
    }
  }
}
