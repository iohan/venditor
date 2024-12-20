import { FC, ReactNode } from "react";

export interface Field<T> {
  title: string | ReactNode;
  presentation?: FC<{ data: T }>;
  center?: boolean;
  width?: string;
}

export type Fields<T> = { [K in keyof T]?: Field<T> } & {
  [k: string]: Field<T>;
};

export type TableProps<T> = {
  data: T[];
  fields: Fields<T>;
};
