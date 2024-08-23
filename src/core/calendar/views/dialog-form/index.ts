import { h } from "@jhonm/blanc-vdom";
import { DispatchType } from "../../../../types";
import { dialogClass } from "../../../../styles/styles.css";

class DialogForm extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
	    <style>
        </style>

        <div part="header"><slot name="header"></slot></div>
        <div part="content"><slot name="content"></slot></div>
    `;
  }
}

customElements.define("dialog-form", DialogForm);

export function DialogFormView({
  dispatch,
  contentView,
}: {
  dispatch: DispatchType;
  contentView: any;
}) {
  return h(
    "dialog",
    { className: dialogClass, id: "dialog-instance" },
    ...[h("dialog-form", {}, ...contentView)]
  );
}
