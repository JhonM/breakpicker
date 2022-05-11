import { render } from "../../core/vdom";
import type { ActionType, Model } from "../../types";

type DispatchType = (action: ActionType) => void;

// Handling all inpure state here
export default function App(
  initModel: Model,
  update: (msg: any, model: Model) => any,
  view: (dispatch: DispatchType, model: Model, selector: HTMLElement) => any,
  node: HTMLElement | null,
  selector: HTMLElement
) {
  let model = initModel;
  let currentView = render(view(dispatch, model, selector));
  node?.appendChild(currentView);

  function dispatch(msg: any) {
    model = update(msg, model);
    const updatedView = render(view(dispatch, model, selector));
    node?.replaceChild(updatedView, currentView);
    currentView = updatedView;
  }
}
