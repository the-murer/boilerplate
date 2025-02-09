export type CommandHandler<Input, Output> = (input: Input) => Output;

export type RequestHeaders = {
  params: Record<string, string>;
};

export interface DefaultResponse {
  success: boolean;
}

export type ValidationFunction = (data: any) => {
  success: boolean;
  errors?: string[];
  data?: any;
};
