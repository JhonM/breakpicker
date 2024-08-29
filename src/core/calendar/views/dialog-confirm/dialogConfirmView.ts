import { h } from "@jhonm/blanc-vdom";
import { dialogClass } from "../../../../styles/styles.css";

export function dialogConfirmView() {
  return h(
    "dialog",
    {
      id: "confirm-dialog",
      className: dialogClass,
      onclose: (e: Event) => {
        const target = e.target;
        const dialogContent = (target as HTMLFormElement)?.querySelector(
          "form"
        );
        if (!dialogContent) return;
        dialogContent.remove();
      },
    },
    ...[
      h("slot", { name: "confirm-dialog-heading" }),
      h("slot", { name: "confirm-dialog-content" }),
    ]
  );
}
