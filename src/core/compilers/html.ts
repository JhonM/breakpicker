// A template engine based on the tutorial from Deepak Vishwakarma -> https://javascript.plainenglish.io/how-to-build-a-template-engine-using-template-literals-in-javascript-9ace13ae4514

export type HtmlProps = {
  strings: TemplateStringsArray;
  keys: any;
};

const evalReg = /(\.)|(\[(\d)\])/;
export const safeEval = (key: any, obj: any, def: any) => {
  let lastKey;
  let match;

  do {
    if (lastKey) {
      if (match && match[2]) {
        obj = obj[lastKey][match[3]];
      } else {
        obj = obj[lastKey];
      }
    }

    match = evalReg.exec(key);
    if (!match) {
      lastKey = key;
      break;
    } else {
      lastKey = key.substr(0, match.index);
      key = key.slice(!match[3] ? match.index + 1 : match.index + 3);
    }
  } while (match);
  if (lastKey) {
    obj = obj[lastKey];
  }
  return obj || def;
};

/**
 * html: tagged function returns a closure function.
 * The closure function parse the template string and bind with the model data
 *
 */
export function html(strings: TemplateStringsArray, ...keys: any) {
  return (model: {}) => {
    let res = "";
    let i = 0;

    for (let s of strings) {
      res += s;
      const k = keys[i++];
      if (k) {
        if (typeof k === "string") res += safeEval(k, model, k);
        else if (typeof k === "function") res += k(model);
        else res += k;
      }
    }
    return res;
  };
}
