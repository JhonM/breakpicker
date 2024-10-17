import { h } from "@jhonm/blanc-vdom";
import { guid } from "../../../helpers/random";
import { DispatchType, HTMLElementEvent } from "../../../types";
import { activeDayMsg } from "../update/updateActiveDay";
import { showAddFormMsg } from "../update/updateShowAddForm";

export const dayContainerView = (
  dayClass: string,
  dispatch: DispatchType,
  dataDay: string | number,
  ...props: any[]
) =>
  h(
    "div",
    {
      className: dayClass,
      "data-day-id": guid(),
      "data-day": dataDay,

      onclick: (e: HTMLElementEvent<HTMLDivElement>) => {
        dispatch?.(showAddFormMsg(true));
        dispatch?.(activeDayMsg(Number(e.target.dataset.day)));
      },
    },
    ...props
  );
