export type FieldErrors = {
  [key: string]: {
    message: string;
  };
};

export type FieldsAccumulator = Record<
  string,
  React.RefObject<HTMLInputElement> | React.RefObject<HTMLInputElement>[]
>;
