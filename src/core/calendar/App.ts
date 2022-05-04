import { render } from "../../core/vdom";
import type { Msgs, Model } from "../../types";

type DispatchType = (action: Msgs) => void;

// Handling all inpure state here
export default function App(
  initModel: any,
  update: (msg: Msgs, model: Model) => any,
  view: (dispatch: DispatchType, model: Model) => any,
  node: HTMLElement | null
) {
  let model = initModel;
  let currentView = render(view(dispatch, model));
  node?.appendChild(currentView);

  function dispatch(msg: Msgs) {
    model = update(msg, model);
    const updatedView = render(view(dispatch, model));
    node?.replaceChild(updatedView, currentView);
    currentView = updatedView;
  }
}
