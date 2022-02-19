function h(type: any, props: any, ...children: any[]) {
  return { type, props: props || {}, children };
}

function createElement(node: any) {
  if (typeof node === "string") {
    return document.createElement(node);
  }
}
