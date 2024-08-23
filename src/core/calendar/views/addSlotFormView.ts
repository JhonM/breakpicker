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
  const event = {
    title: "some title to edit",
    duration: "233",
  };

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
      baseInput(event.title, "text", "mainTitle"),
      baseInput(event.duration, "number", "duration"),
      `${date.toLocaleDateString()}`,
      submitButton(),
    ]
  );
}
