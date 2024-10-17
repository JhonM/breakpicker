import { h } from "@jhonm/blanc-vdom";
import { addSlotFormClass } from "../../../styles/styles.css";
import { DispatchType, Model } from "../../../types";
import { showAddFormMsg } from "../update/updateShowAddForm";
import { setEventsBeforeCRUD } from "../update/updateSetEventsBeforeCRUD";
import { onSubmitMsg } from "../update/updateOnSubmit";

type InputType = "text" | "number";

function input(value: string | undefined, type: InputType, name: string) {
  return h("input", { type, name, value }, "");
}

function fieldSet(value: string | undefined, type: InputType, name: string) {
  return h("fieldset", {}, input(value, type, name));
}

function closeButton(onclick: () => void) {
  return h("button", { onclick }, "close");
}

function baseInput(value: string | undefined, type: InputType, name: string) {
  return fieldSet(value, type, name);
}

function submitButton() {
  return h("button", { type: "submit" }, "submit");
}

export function addSlotFormView(dispatch: DispatchType, model: Model) {
  const date = new Date(model.year, model.month, model.activeDay);
  const findCurrentEvent = model?.events?.find(
    (event) => event.id === model.eventId
  );
  const slot = findCurrentEvent?.slots?.find(
    (slot) => slot.id === model.editId
  );

  if (model.editMode && slot) {
    return h(
      "form",
      {
        className: addSlotFormClass,
        onsubmit: (e: SubmitEvent) => {
          e.preventDefault();
          dispatch(setEventsBeforeCRUD(model.events));

          const target = e.target as HTMLFormElement;

          dispatch(
            onSubmitMsg({
              title: target?.mainTitle.value,
              duration: target?.duration.value,
              slotId: model.currentSlotId || null,
              date,
            })
          );
        },
      },
      ...[
        closeButton(() => dispatch(showAddFormMsg(false))),
        baseInput(slot?.title, "text", "mainTitle"),
        baseInput(slot?.duration.toString(), "number", "duration"),
        `${date.toLocaleDateString()}`,
        submitButton(),
        h("pre", {}, JSON.stringify(model, null, 2)),
      ]
    );
  }

  return h(
    "form",
    {
      className: addSlotFormClass,
      onsubmit: (e: SubmitEvent) => {
        e.preventDefault();
        dispatch(setEventsBeforeCRUD(model.events));

        const target = e.target as HTMLFormElement;

        dispatch(
          onSubmitMsg({
            title: target?.mainTitle.value,
            duration: target?.duration.value,
            slotId: model.currentSlotId || null,
            date,
          })
        );
      },
    },
    ...[
      closeButton(() => dispatch(showAddFormMsg(false))),
      baseInput("", "text", "mainTitle"),
      baseInput("", "number", "duration"),
      `${date.toLocaleDateString()}`,
      submitButton(),
      h("pre", {}, JSON.stringify(model, null, 2)),
    ]
  );
}
