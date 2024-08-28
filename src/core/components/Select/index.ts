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
  selected,
  ...props
}: {
  className: string;
  value: string;
  selected: boolean;
}) => {
  const hasSelected = selected ? { selected, ...props } : { ...props };
  return h("option", { className, ...hasSelected }, value);
};
