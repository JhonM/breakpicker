import { h } from "@jhonm/blanc-vdom";
import { addSlotFormClass } from "../../../styles/styles.css";
import { DispatchType, Model } from "../../../types";
import { showAddFormMsg, onSubmitMsg } from "../Update";

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

          if (e.target) {
            const target = e.target as HTMLFormElement;

            const title = target?.mainTitle.value;
            const duration = target?.duration.value;

            dispatch(
              onSubmitMsg({
                title,
                duration,
                date,
                slotId: model.currentSlotId || null,
              })
            );
            dispatch(showAddFormMsg(false));
          }
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
