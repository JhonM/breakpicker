import { addSlotCommand } from "./add-slot-command";
import { deleteSlotCommand } from "./delete-slot-command";
import { editSlotCommand } from "./edit-slot-command";
import { copyEventCommand } from "./copy-event-command";

const ADD_SLOT = "ADD_SLOT";
const DELETE_SLOT = "DELETE_SLOT";
const EDIT_SLOT = "EDIT_SLOT";
const COPY_EVENT = "COPY_EVENT";

export const commands = {
  [ADD_SLOT]: addSlotCommand,
  [DELETE_SLOT]: deleteSlotCommand,
  [COPY_EVENT]: copyEventCommand,
  [EDIT_SLOT]: editSlotCommand,
};
