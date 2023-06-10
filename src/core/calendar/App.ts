import { render } from "@jhonm/blanc-vdom";
import type { ActionType, Model, Options } from "../../types";

type DispatchType = (action: ActionType) => void;

// Handling all inpure state here
export default function App(
  initModel: Model,
  update: (msg: ActionType, model: Model) => Model,
  view: (dispatch: DispatchType, model: Model, options: Options) => any,
  node: HTMLElement | null,
  options: Options
) {
  let model = initModel;
  let currentView = render(view(dispatch, model, options));
  node?.appendChild(currentView);

  function dispatch(msg: ActionType) {
    model = update(msg, model);
    const updatedView = render(view(dispatch, model, options));
    node?.replaceChild(updatedView, currentView);
    currentView = updatedView;
  }
}
