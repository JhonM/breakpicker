import { concat } from "./compose";

export const guid = () => {
  const uid = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);

  return concat(uid())(uid());
};
