import { IDatabaseCommand } from "./idatabase-conmand";
import Control from "../control";

export default class ControlAddSlotCommand implements IDatabaseCommand {
  #control: Control;

  constructor(control: Control) {
    this.#control = control;
  }

  async execute() {
    return this.#control.addSlot();
  }
}
