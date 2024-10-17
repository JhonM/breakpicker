import { h, render } from "@jhonm/blanc-vdom";
import { DispatchType, EventType, Model, Slot } from "../../../../types";
import { deleteSlotMsg } from "../../update/updateDeleteSlot";
import { currentSlotIdMsg } from "../../update/updateCurrentSlotId";
import { setEventsBeforeCRUD } from "../../update/updateSetEventsBeforeCRUD";
import { slotTitle } from "./slotTitle";
import { guid } from "../../../../helpers/random";

type SlotViewProp = {
  dispatch: DispatchType;
  id: Slot["id"];
  title: Slot["title"];
  startDate: Slot["startDate"];
  model: Model;
};

function slotDeleteButton({
  dispatch,
  id,
  title,
  startDate,
  model,
}: SlotViewProp) {
  const formId = guid();
  const handleClose = ({
    dialog,
    id,
  }: {
    dialog: HTMLDialogElement;
    id: string;
  }) => {
    const form = document.getElementById(id);
    dialog.close();
    form?.remove();
  };

  return h(
    "div",
    {
      onclick: (e: Event) => {
        e.stopPropagation();

        const dialog = document.getElementById(
          "confirm-dialog"
        ) as HTMLDialogElement;

        const dialogContent = render(
          h(
            "form",
            {
              method: "dialog",
              id: formId,
              onsubmit: (e: SubmitEvent) => {
                e.stopPropagation();
                dispatch(setEventsBeforeCRUD(model.events));
                dispatch(deleteSlotMsg(id, startDate));
                dispatch(currentSlotIdMsg(id));
              },
            },
            ...[
              h(
                "button",
                { onclick: () => handleClose({ dialog, id: formId }) },
                "X"
              ),
              h(
                "H1",
                {
                  slot: "confirm-dialog-heading",
                },
                `Delete "${title}"`
              ),
              h(
                "p",
                {
                  slot: "confirm-dialog-content",
                },
                ...[
                  h(
                    "button",
                    {
                      onclick: () => handleClose({ dialog, id: formId }),
                    },
                    "No"
                  ),
                  h(
                    "button",
                    {
                      type: "submit",
                    },
                    "Yes"
                  ),
                ]
              ),
            ]
          )
        );

        if (!dialog) return;
        dialog.appendChild(dialogContent);
        dialog.showModal();
      },
    },
    "X"
  );
}
export function slotView(
  dispatch: DispatchType,
  slot: Slot,
  model: Model,
  eventId: EventType["id"]
) {
  const { title, id, startDate } = slot;

  return h(
    "div",
    {},
    ...[
      slotTitle({ dispatch, title, id, model, eventId }),
      slotDeleteButton({ dispatch, title, id, startDate, model }),
    ]
  );
}
