import { h } from "@jhonm/blanc-vdom";
import { addSlotFormClass } from "../../../styles/styles.css";
import { DispatchType, Model } from "../../../types";
import { showAddFormMsg } from "../update/updateShowAddForm";
import { setEventsBeforeAddingSlotMsg } from "../update/updateSetEventsBeforeAddingSlot";
import { onSubmitMsg } from "../update/updateOnSubmit";

type InputType = "text" | "number";

function input(type: InputType, name: string) {
  return h("input", { type, name }, "");
}

function fieldSet(type: InputType, name: string) {
  return h("fieldset", {}, input(type, name));
}

function closeButton(onclick: () => void) {
  return h("button", { onclick }, "close");
}

function baseInput(type: InputType, name: string) {
  return fieldSet(type, name);
}

function submitButton() {
  return h("button", { type: "submit" }, "submit");
}

export function addSlotFormView(dispatch: DispatchType, model: Model) {
  const date = new Date(model.year, model.month, model.activeDay);

  if (model.showAddForm) {
    return h(
      "form",
      {
        className: addSlotFormClass,
        onsubmit: (e: SubmitEvent) => {
          e.preventDefault();
          dispatch(setEventsBeforeAddingSlotMsg(model.events));

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
        baseInput("text", "mainTitle"),
        baseInput("number", "duration"),
        `${date.toLocaleDateString()}`,
        submitButton(),
      ]
    );
  }

  return h("span", {});
}
