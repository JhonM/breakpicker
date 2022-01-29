export const compose = (...functions: any[]) => (x: any) => functions.reduceRight((acc, fn) => fn(acc), x);
