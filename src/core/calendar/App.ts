import { render } from "../../core/vdom";
import type { Msgs } from "../../types";

type DispatchType = (action: Msgs) => void;

export default function App(
  initModel: any,
  update: (msg: Msgs, model: number) => number,
  view: (dispatch: DispatchType, model: number) => any,
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
