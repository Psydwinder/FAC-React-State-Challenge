import { cwd } from "node:process";
import { pathToFileURL } from "node:url";
import esbuild from "esbuild";

/**
 * Adapted from:
 * https://nodejs.org/api/esm.html#esm_transpiler_loader
 */

const baseURL = pathToFileURL(`${cwd()}/`).href;

const extensionsRegex = /\.jsx$/;

export async function resolve(specifier, context, nextResolve) {
  if (extensionsRegex.test(specifier)) {
    const { parentURL = baseURL } = context;
    // Node normally errors on unknown file exts, so return a URL for specifiers ending in .jsx.
    return {
      shortCircuit: true,
      url: new URL(specifier, parentURL).href,
    };
  }

  // Let Node handle all other specifiers.
  return nextResolve(specifier);
}

const format = "module";

export async function load(url, context, nextLoad) {
  if (extensionsRegex.test(url)) {
    const { source: rawSource } = await nextLoad(url, { ...context, format });
    const { code: source } = await esbuild.transform(rawSource.toString(), {
      logLevel: "error",
      jsx: "automatic",
      loader: "jsx",
    });
    return {
      format,
      shortCircuit: true,
      source,
    };
  }

  // Let Node handle all other URLs.
  return nextLoad(url);
}
