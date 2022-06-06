import { h } from "@jhonm/blanc-vdom";

export const select = ({
  className,
  onchange,
  options,
  ...props
}: {
  className: string;
  options: Array<any>;
  onchange: (e: any) => void;
}) =>
  h(
    "select",
    { className, onchange: (e: any) => onchange(e), ...props },
    ...options
  );

export const option = ({
  className,
  value,
  ...props
}: {
  className: string;
  value: string;
  selected: boolean;
}) => h("option", { className, ...props }, value);
