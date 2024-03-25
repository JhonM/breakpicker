import { h } from "@jhonm/blanc-vdom";
import { DispatchType, Model } from "../../../types";
import { showHideToastMsg } from "../update/updateControlToastNotification";

export function toastViewDetail() {
  return h("div", {}, "Slot is added");
}
export function toastView(dispatch: DispatchType, model: Model, view: any) {
  // for testing purposes, come up with a better solution
  if (model.showToast) {
    setTimeout(() => {
      (() => {
        dispatch(showHideToastMsg(false));
      })();
    }, 4000);
    return h("div", { className: "toast" }, ...[toastViewDetail(), view]);
  }

  return h("div", { className: "toast" }, "");
}
