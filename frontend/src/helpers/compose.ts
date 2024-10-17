export const compose =
  (...functions: any[]) =>
  (x: any) =>
    functions.reduceRight((acc, fn) => fn(acc), x);
export const concat = (a: string) => (b: string) => a + b;
