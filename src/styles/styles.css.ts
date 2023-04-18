import { style } from "@vanilla-extract/css";

const defaultGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
};

export const monthClass = style(defaultGrid);
export const weekClass = style(defaultGrid);

export const dayClass = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: 40,
  height: 40,
  color: "purple",
  cursor: "pointer",
  selectors: {
    "&:first-child": {
      gridColumn: 7,
    },
  },
});

export const prevLastDayClass = style([
  dayClass,
  {
    opacity: 0.4,
  },
]);

export const currentDayClass = style({
  padding: 2,
  borderRadius: "50%",
  backgroundColor: "black",
  color: "white",
});

export const monthDayClass = style({
  color: "red",
});
