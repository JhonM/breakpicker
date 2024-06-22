import { screen } from "@testing-library/dom";
import { render } from "@jhonm/blanc-vdom";
import { select } from "..";

describe("select", () => {
  it("renders the select", () => {
    const selectView = select({
      className: "select-className",
      options: ["one", "two", "three"],
      onchange: jest.fn(),
    });

    const r = render(selectView);

    document.body.appendChild(r);

    const s = screen.getByRole("combobox");

    expect(s);
  });
});
