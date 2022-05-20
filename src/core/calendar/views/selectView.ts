import { h } from "../../../core/vdom";
import { select, option } from "../../components";
import {
  DispatchType,
  Model,
  MonthsType,
  Months as months,
} from "../../../types";

const options: Array<string> = ["option 1", "option 2", "option 3", "option 4"];

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
  return h("select", { className: "" }, ...selectOptions(selected));
}

export function selectView(dispatch: DispatchType, model: Model) {
  return h("div", { className: "select-view" }, container(model.currentMonth));
  //
}
