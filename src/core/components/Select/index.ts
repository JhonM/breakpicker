import { h } from "../../../core/vdom";

export const select = ({
  className,
  onchange,
  ...props
}: {
  className: string;
  children: Array<any>;
  onchange: (e: any) => void;
}) =>
  h(
    "select",
    { className, onchange: (e: any) => onchange(e), ...props },
    ...props.children
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
