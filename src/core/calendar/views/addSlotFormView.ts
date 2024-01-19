import { h } from "@jhonm/blanc-vdom";
import { addSlotFormClass } from "../../../styles/styles.css";
import { DispatchType, Model } from "../../../types";
import { showAddFormMsg, onSubmitMsg } from "../Update";

function input(dispatch: DispatchType, model: Model, name: string) {
  return h("input", { type: "text", value: "model", name }, "");
}

function fieldSet(dispatch: DispatchType, model: Model, name: string) {
  return h("fieldset", {}, input(dispatch, model, name));
}

function closeButton(onclick: () => void) {
  return h("button", { onclick }, "close");
}

function titleFieldSet(dispatch: DispatchType, model: Model, name: string) {
  return fieldSet(dispatch, model, name);
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
          dispatch(onSubmitMsg());
          dispatch(showAddFormMsg(false));
        },
      },
      ...[
        closeButton(() => dispatch(showAddFormMsg(false))),
        titleFieldSet(dispatch, model, "title"),
        `${date.toLocaleDateString()}`,
        submitButton(),
      ]
    );
  }

  return h("span", {});
}
