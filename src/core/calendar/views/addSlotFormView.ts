import { h } from "@jhonm/blanc-vdom";
import { addSlotFormClass } from "../../../styles/styles.css";
import { DispatchType, Model } from "../../../types";
import { showAddFormMsg, onSubmitMsg } from "../Update";

function input(dispatch: DispatchType, name: string) {
  return h("input", { type: "text", name }, "");
}

function fieldSet(dispatch: DispatchType, name: string) {
  return h("fieldset", {}, input(dispatch, name));
}

function closeButton(onclick: () => void) {
  return h("button", { onclick }, "close");
}

function baseInput(dispatch: DispatchType, name: string) {
  return fieldSet(dispatch, name);
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
            const slotId = target;
            console.info(slotId, "slotId");

            dispatch(
              onSubmitMsg({
                title,
                duration,
                date,
                slotId,
              })
            );
            dispatch(showAddFormMsg(false));
          }
        },
      },
      ...[
        closeButton(() => dispatch(showAddFormMsg(false))),
        baseInput(dispatch, "mainTitle"),
        baseInput(dispatch, "duration"),
        `${date.toLocaleDateString()}`,
        submitButton(),
      ]
    );
  }

  return h("span", {});
}
