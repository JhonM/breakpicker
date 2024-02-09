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

          const title = e.target?.title.value;
          const duration = e.target?.duration.value;

          dispatch(
            onSubmitMsg({
              title,
              duration,
              date,
            })
          );
          dispatch(showAddFormMsg(false));
        },
      },
      ...[
        closeButton(() => dispatch(showAddFormMsg(false))),
        baseInput(dispatch, "title"),
        baseInput(dispatch, "duration"),
        `${date.toLocaleDateString()}`,
        submitButton(),
      ]
    );
  }

  return h("span", {});
}
