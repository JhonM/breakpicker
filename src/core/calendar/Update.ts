import { match } from "../../helpers/match";
import type { ActionType, Model } from "../../types";
import { MSGS } from "../../types";
import { updateActiveDay } from "./update/updateActiveDay";
import { updateControlToastNotification } from "./update/updateControlToastNotification";
import { updateCurrentMonth } from "./update/updateCurrentMonth";
import { updateCurrentSlotId } from "./update/updateCurrentSlotId";
import { updateDeleteSlot } from "./update/updateDeleteSlot";
import { updateGoToToday } from "./update/updateGoToToday";
import { updateNextMonth } from "./update/updateNextMonth";
import { updateOnSubmit } from "./update/updateOnSubmit";
import { updatePrevMonth } from "./update/updatePrevMonth";
import { updateSelectedDate } from "./update/updateSelectedDate";
import { updateSetEventsBeforeAddingSlot } from "./update/updateSetEventsBeforeAddingSlot";
import { updateShowAddForm } from "./update/updateShowAddForm";
import { updateUndoLatestSlot } from "./update/updateUndoLatestSlot";

export default function update(msg: ActionType, model: Model): Model {
  return match<ActionType, Model>(msg)
    .on(
      (x) => x.type === MSGS.CURRENT_MONTH,
      (x) => updateCurrentMonth({ msg: x, model })
    )
    .on(
      (x) => x.type === MSGS.SELECTED_DATE,
      (x) => updateSelectedDate({ msg: x, model })
    )
    .on(
      (x) => x.type === MSGS.SHOW_ADD_FORM,
      (x) => updateShowAddForm({ msg: x, model })
    )
    .on(
      (x) => x.type === MSGS.PREV_MONTH,
      (x) => updatePrevMonth({ msg: x, model })
    )
    .on(
      (x) => x.type === MSGS.NEXT_MONTH,
      (x) => updateNextMonth({ msg: x, model })
    )
    .on(
      (x) => x.type === MSGS.GO_TO_TODAY,
      () => updateGoToToday({ model })
    )
    .on(
      (x) => x.type === MSGS.ACTIVE_DAY,
      (x) => updateActiveDay({ msg: x, model })
    )
    .on(
      (x) => x.type === MSGS.CURRENT_SLOT_ID,
      (x) => updateCurrentSlotId({ msg: x, model })
    )
    .on(
      (x) => x.type === MSGS.SET_EVENTS_BEFORE_ADDING_SLOT,
      (x) => updateSetEventsBeforeAddingSlot({ msg: x, model })
    )
    .on(
      (x) => x.type === MSGS.UNDO_ADD_LATEST_SLOT,
      (x) => updateUndoLatestSlot({ msg: x, model })
    )
    .on(
      (x) => x.type === MSGS.ON_SUBMIT,
      (x) => updateOnSubmit({ msg: x, model })
    )
    .on(
      (x) => x.type === MSGS.SHOW_TOAST,
      (x) => updateControlToastNotification({ msg: x, model })
    )
    .on(
      (x) => x.type === MSGS.DELETE_SLOT,
      (x) => updateDeleteSlot({ msg: x, model })
    )
    .otherwise(() => model);
}
