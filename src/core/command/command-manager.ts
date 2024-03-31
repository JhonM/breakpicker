import { Model } from "../../types";
import { createCommandManager } from "./create-command-manager";

export function commandManager({ model, msg }: { model: Model; msg: any }) {
  return createCommandManager(model, msg);
}
