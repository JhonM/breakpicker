import { globalStyle, style } from "@vanilla-extract/css";

globalStyle("html, body, #app", { margin: 0, height: "100%" });

const defaultGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  height: "100%",
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
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  flexDirection: "column",
});

export const containerClass = style({
  height: "100%",
});

export const calendarClass = style({
  height: "100%",
});

export const calendarFooterClass = style({
  height: "100%",
});

export const dayContainerClass = style({
  height: "100%",
  width: "100%",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  flexDirection: "column",
});

export const addSlotFormClass = style({
  height: "100vh",
  width: "100%",
});

export const eventClass = style({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const weekDayClass = style({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const dialogClass = style({
  position: "fixed",
  transition: ".3s",
  selectors: {
    "&::backdrop": {
      background: "rgba(#000, 0.2)",
      backdropFilter: "blur(4px)",
    },
    "&[open]": {
      display: "flex",
      transition: ".3s",
    },
  },
});
