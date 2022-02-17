import { html } from "../html";

test("it renders", () => {
  const template = html` <div id="test-renders">
    <h1>${(m: any) => m.heading}</h1>
    <p>${"paragraph"}</p>
  </div>`;
  const result = template({
    heading: "Heading text",
    paragraph: "Short paragraph text",
  });

  expect(result).toEqual(` <div id="test-renders">
    <h1>Heading text</h1>
    <p>Short paragraph text</p>
  </div>`);
});
