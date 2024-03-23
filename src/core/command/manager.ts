import CommandManager from "./command-manager";
import { UIEventHandler } from "./ui-event-handler";

export const commandManager = new CommandManager();
export const eventHandler = new UIEventHandler(commandManager);
