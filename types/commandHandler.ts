
export type CommandHandler<Input, Output> = (input: Input) => Output;

export type RequestHeaders = {
  params: Record<string, string>;
};
