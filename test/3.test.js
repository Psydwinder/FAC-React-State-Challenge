// eslint-disable-next-line import/no-unresolved
import { describe as test, after } from "node:test";
import assert from "node:assert/strict";
import {
  component,
  render,
  createElement,
  fireEvent,
  screen,
  tag,
} from "./helpers.js";

test("User can filter list by selecting different category", async () => {
  const App = await component("App");
  const el = createElement(App);
  const { unmount, container } = render(el);
  after(unmount);

  const burger = screen.getByLabelText(/burger/i);
  fireEvent.click(burger);

  const ul = tag(container, "ul", window.HTMLUListElement);
  const kids = ul.children.length;
  assert.equal(
    kids,
    8,
    `Expected <ul> to have 12 children after category set to 'burger', but got ${kids} children`
  );

  const topping = screen.getByLabelText(/topping/i);
  fireEvent.click(topping);

  const ul2 = tag(container, "ul", window.HTMLUListElement);
  const kids2 = ul2.children.length;
  assert.equal(
    kids2,
    15,
    `Expected <ul> to have 15 children after category set to 'toppings', but got ${kids2} children`
  );
});
