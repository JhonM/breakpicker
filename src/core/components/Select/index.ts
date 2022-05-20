import { h } from "../../../core/vdom";

export const select = ({
  className,
  ...props
}: {
  className: string;
  children: Array<any>;
}) => h("select", { className, ...props }, ...props.children);

export const option = ({
  className,
  value,
  ...props
}: {
  className: string;
  value: string;
  selected: boolean;
}) => h("option", { className, ...props }, value);
