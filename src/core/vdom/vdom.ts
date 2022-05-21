type SetPropsType = {
  target: any;
  name: string;
  value: any;
};

export const h = (type: any, props: any, ...children: any[]) => {
  return { type, props: props || {}, children };
};

export const render = (vnode: any) => {
  // convert strings to text nodes
  if (vnode.split) return document.createTextNode(vnode);

  // create DOM element with nodeName
  let node = document.createElement(vnode.type);

  // copy props onto new node
  let props = vnode.props || {};
  setProps(node, props);

  // render and append child nodes
  (vnode.children || []).forEach((child: any) => node.append(render(child)));

  return node;
};

export const changed = (node1: any, node2: any) => {
  return (
    typeof node1 !== typeof node2 ||
    (typeof node1 === "string" && node1 !== node2) ||
    node1.type !== node2.type
  );
};

export const setProps = (target: any, props: any) => {
  Object.keys(props).forEach((name) => {
    setProp({ target, name, value: props[name] });
  });
};

export const setProp = ({ target, name, value }: SetPropsType) => {
  if (isCustomProp(name)) {
    return;
  } else if (name === "className") {
    target.setAttribute("class", value);
  } else if (name === "boolean" || name === "selected") {
    setBooleanProp({ target, name, value });
  } else if (name === "onclick") {
    target.addEventListener("click", (e: any) => value(e));
  } else if (name === "onchange") {
    target.addEventListener("change", (e: any) => value(e));
  } else {
    target.setAttribute(name, value);
  }
};

export const setBooleanProp = ({ target, name, value }: SetPropsType) => {
  if (value) {
    target.setAttribute(name, value);
    target[name] = true;
  } else {
    target[name] = false;
  }
};

// TODO: need to make this work, now its just redundant code
export const isCustomProp = (name: any) => {
  return false;
};
