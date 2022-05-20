import { h } from "../../../core/vdom";

export const select = ({ className, ...props }: { className: string }) =>
  h("select", { className, ...props });

export const option = ({
  className,
  value,
  ...props
}: {
  className: string;
  value: string;
  selected: boolean;
}) => h("option", { className, ...props }, value);
