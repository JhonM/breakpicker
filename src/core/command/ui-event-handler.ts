import CommandManager from "./command-manager";
import { ICommand } from "./icommand";

export class UIEventHandler {
  constructor(public cmdManager: CommandManager) {}

  handleAction(command: string | ICommand) {
    this.cmdManager.executeCommand(command);
  }
}
