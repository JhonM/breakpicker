// used this from Blake Emray (https://github.com/blakeembrey/js-template/blob/master/src/index.ts)

export type Template<T extends object> = (data: T) => string;
const DATA_NAME = "data";

/*
 * string template to a function
 */
export function compile(value: string, displayName = "template") {
  const str = value.replace(/"|{{[^{]+}}/g, (prop) => {
    if (prop === '"') return '\\"';
    return `" + ${DATA_NAME}.${prop.slice(2, -2).trim()} + "`;
  });

  return `function ${displayName}(${DATA_NAME}) { return "${str}" }`;
}

/*
 * String templates
 */
export function template<T extends object = object>(
  value: string,
  displayName?: string
) {
  const body = compile(value, displayName);
  return new Function(`return (${body});`)() as Template<T>;
}
