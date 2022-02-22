type SetPropsType = {
  target: any;
  name: string;
  value: string;
};

export const h = (type: any, props: any, ...children: any[]) => {
  return { type, props: props || {}, children };
};

export const createElement = (node: any) => {
  if (typeof node === "string") {
    return document.createElement(node);
  }

  const element = document.createElement(node.type);
  setProps(element, node.props);
  node.children.map(createElement).forEach((element: any) => {
    element.appendChild.bind(element);
    return element;
  });
  return document.createTextNode(node.type);
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
  } else if (name === "boolean") {
    setBooleanProp({ target, name, value });
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
