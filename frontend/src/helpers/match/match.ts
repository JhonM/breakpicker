type AssertFunc<Input> = (input: Input) => boolean;
type ExecFunc<Input, Output> = (input: Input) => Output;

interface MatchType<Input, Output> {
  on: (
    assertFunc: AssertFunc<Input>,
    execFunc: ExecFunc<Input, Output>
  ) => MatchType<Input, Output>;
  otherwise: (execFunc: ExecFunc<Input, Output>) => Output;
}

function matched<Input>(input: Input) {
  return {
    on: () => matched(input),
    otherwise: () => input,
  };
}

export function match<Input, Output>(input: Input): MatchType<Input, Output> {
  return {
    on: (assertFunc: AssertFunc<Input>, execFunc: ExecFunc<Input, Output>) =>
      assertFunc(input) ? matched(execFunc(input)) : match(input),
    otherwise: (execFunc: ExecFunc<Input, Output>) => execFunc(input),
  };
}
