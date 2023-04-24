type DefaultDBFields = "id" | "createdAt" | "updatedAt";

// 数据库默认字段
export interface DbFiled {
  id: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export type OmitUserSecretFiled<U> = Omit<U, "password" | "email">;

// 过滤掉数据库默认字段
export type OmitDBFiled<T, K extends keyof T = never> = Omit<
  T,
  K | DefaultDBFields
>;

// 指定部分字段可选
export type PartialPart<T, P extends keyof T> = Partial<T> & Omit<T, P>;
