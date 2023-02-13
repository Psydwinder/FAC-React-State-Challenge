// eslint-disable-next-line import/no-unresolved
import { describe as test, after } from "node:test";
import assert from "node:assert/strict";
import { component, render, createElement, fireEvent, tag } from "./helpers.js";

test("User can filter list by changing range input", async () => {
  const App = await component("App");
  const el = createElement(App);
  const { unmount, container } = render(el);
  after(unmount);

  const range = tag(container, "input[type='range']", window.HTMLInputElement);
  fireEvent.change(range, { target: { value: "0.5" } });

  const ul = tag(container, "ul", window.HTMLUListElement);
  const kids = ul.children.length;
  assert.equal(
    kids,
    12,
    `Expected <ul> to have 12 children after max price set to 0.5, but got ${kids} children`
  );

  fireEvent.change(range, { target: { value: "4.25" } });

  const ul2 = tag(container, "ul", window.HTMLUListElement);
  const kids2 = ul2.children.length;
  assert.equal(
    kids2,
    42,
    `Expected <ul> to have 12 children after max price set to 4.25, but got ${kids2} children`
  );
});
