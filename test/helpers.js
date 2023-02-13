// eslint-disable-next-line import/no-unresolved
import "global-jsdom/register";
import assert from "node:assert/strict";
import { prettyDOM } from "@testing-library/react/pure.js";

export { createElement } from "react";
export {
  render,
  screen,
  fireEvent,
  prettyDOM,
} from "@testing-library/react/pure.js";

const DIR = process.env.DIR;

export async function component(name) {
  const path = `../${DIR}/${name}.jsx`;
  const module = await import(path).catch((e) => assert.fail(e.message));
  assert.equal(
    typeof module.default,
    "function",
    `Default export from ${name}.jsx should be a function, but got:
    
    ${module.default}
  `
  );
  return module.default;
}

export function tag(container, tag, constructor) {
  const el = container.querySelector(tag);
  assert.ok(
    el instanceof constructor,
    `Should render a <${tag}>, but got:\n${prettyDOM()}`
  );
  return el;
}
