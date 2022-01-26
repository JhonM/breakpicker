/**
 * @jest-environment jsdom
 */
import { screen } from "@testing-library/dom";
import fireEvent from "@testing-library/user-event";
import { Calendar } from "../calendar";

beforeEach(() => {
  const input = document.createElement("input");
  input.id = "input";
  input.dataset.testid = "input";
  document.body.appendChild(input);
});

afterEach(() => {
  const input = document.getElementById("input") as HTMLElement;
  document.body.removeChild(input);
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
  // const input = document.getElementById("input") as HTMLElement;
  const input = screen.getByTestId("input");
  const options = {
    selector: input,
  };
  new Calendar({ ...options });

  fireEvent.click(input);
  expect(screen.getByText("Calendar container")).toBeTruthy();
});
