/**
 * @jest-environment jsdom
 */
import { screen } from "@testing-library/dom";
import fireEvent from "@testing-library/user-event";
import { getCurrentMonthName, getCurrentYear } from "../../helpers/dates";
import { Calendar } from "../calendar";

beforeEach(() => {
  const input = document.createElement("input");
  input.id = "input";
  input.dataset.testid = "input";
  document.body.appendChild(input);
});

afterEach(() => {
  const input = document.getElementById("input") as HTMLElement;
  const calendars = document.querySelectorAll("div[data-breakpicker-id]");
  calendars.forEach((cal) => {
    if (cal) {
      cal.remove();
    }
  });
  document.body.removeChild(input);
});

test("it renders with an unique id", () => {
  const input = screen.getByTestId("input");
  const optionsInput = {
    selector: input,
  };
  new Calendar({ ...optionsInput });

  fireEvent.click(input);

  const container = document.querySelector(
    '[data-breakpicker-type="container"]'
  );
  expect(
    container?.parentElement?.getAttribute("data-breakpicker-id")
  ).toBeTruthy();
});

test("it renders with a selection option", () => {
  const input = screen.getByTestId("input");
  const options = {
    selector: input,
  };
  const BP = new Calendar({ ...options });

  expect(BP).toMatchObject(options);
});

test("it opens the picker", () => {
  const input = screen.getByTestId("input");
  const options = {
    selector: input,
  };
  const todayDate = `${getCurrentMonthName} ${getCurrentYear}`;

  new Calendar({ ...options });

  fireEvent.click(input);
  expect(screen.getByText(todayDate)).toBeTruthy();
});

test("it shows the days of the week", () => {
  const input = screen.getByTestId("input");
  const options = {
    selector: input,
  };
  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  new Calendar({ ...options });
  fireEvent.click(input);

  expect(screen.getByText("Su").dataset.breakpickerDay).toBe(days[0]);
  expect(screen.getByText("Mo").dataset.breakpickerDay).toBe(days[1]);
  expect(screen.getByText("Tu").dataset.breakpickerDay).toBe(days[2]);
  expect(screen.getByText("We").dataset.breakpickerDay).toBe(days[3]);
  expect(screen.getByText("Th").dataset.breakpickerDay).toBe(days[4]);
  expect(screen.getByText("Fr").dataset.breakpickerDay).toBe(days[5]);
  expect(screen.getByText("Sa").dataset.breakpickerDay).toBe(days[6]);
});
