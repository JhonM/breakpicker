import { h } from "@jhonm/blanc-vdom";
import { addSlotFormClass } from "../../../styles/styles.css";
import { DispatchType, Model } from "../../../types";
import { showAddFormMsg } from "../Update";

function input(dispatch: DispatchType, model: Model) {
  return h("input", { type: "text", value: "model" });
}

function fieldSet(
  dispatch: DispatchType,
  model: Model,
  input: (
    dispatch: DispatchType,
    model: Model
  ) => { type: any; props: any; children: any[] }
) {
  return h("fieldset", {}, input(dispatch, model));
}

function closeButton(onclick: () => void) {
  return h("button", { onclick }, "close");
}

function titleFieldSet(dispatch: DispatchType, model: Model) {
  return fieldSet(dispatch, model, input);
}

export function addSlotFormView(dispatch: DispatchType, model: Model) {
  const date = new Date(model.year, model.month, model.activeDay);

  if (model.showAddForm) {
    return h(
      "form",
      {
        className: addSlotFormClass,
      },
      ...[
        closeButton(() => dispatch(showAddFormMsg(false))),
        titleFieldSet(dispatch, model),
        `${date.toLocaleDateString()}`,
      ]
    );
  }

  return h("span", {});
}
