import { h } from "../../../core/vdom";
import { select, option } from "../../components";
import {
  DispatchType,
  Model,
  MonthsType,
  Months as months,
} from "../../../types";

function selectOptions(selectedOption: MonthsType) {
  const opt = months.map((value: string) =>
    option({
      className: "some-cool-classname",
      value,
      selected: selectedOption === value,
    })
  );

  return opt;
}

function container(selected: MonthsType) {
  return select({
    className: "select-classname",
    children: selectOptions(selected),
  });
}

export function selectView(dispatch: DispatchType, model: Model) {
  return h("div", { className: "select-view" }, container(model.currentMonth));
  //
}
