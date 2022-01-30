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
  console.log(document.body.innerHTML, "...before");
  document.body.removeChild(input);
  console.log(document.body.innerHTML, "...after");
});

test("it renders unique id's", () => {
  const input = screen.getByTestId("input");
  const optionsInput = {
    selector: input,
  };
  new Calendar({ ...optionsInput });
  const inputId = input.querySelector('[data-breakpicker-type="container"]');
  console.log(inputId);
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
  expect(screen.getByText("January 2022")).toBeTruthy();
});
