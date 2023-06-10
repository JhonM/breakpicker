import { h } from "@jhonm/blanc-vdom";
import { select, option } from "../../components/Select";
import {
  DispatchType,
  Model,
  MonthsType,
  Months as months,
} from "../../../types";
import { changeCurrentMonthMsg } from "../Update";

function selectOptions(dispatch: DispatchType, selectedOption: MonthsType) {
  const opt = months.map((value: string) =>
    option({
      className: "",
      value,
      selected: selectedOption === value,
    })
  );

  return opt;
}

function container(dispatch: DispatchType, selected: MonthsType) {
  return select({
    className: "select-classname",
    options: selectOptions(dispatch, selected),
    onchange: (e) =>
      dispatch(changeCurrentMonthMsg(e.target.value as MonthsType)),
  });
}

export function selectView(dispatch: DispatchType, model: Model) {
  return h(
    "div",
    { className: "select-view-class" },
    container(dispatch, model.currentMonth)
  );
}
