import { addSlotCommand } from "./add-slot-command";
import { copyEventCommand } from "./copy-event-command";

const ADD_SLOT = "ADD_SLOT";
const COPY_EVENT = "COPY_EVENT";

export const commands = {
  [ADD_SLOT]: addSlotCommand,
  [COPY_EVENT]: copyEventCommand,
};
