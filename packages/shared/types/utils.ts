type DefaultDBFields = 'id' | 'createdAt' | 'updatedAt';

export type OmitDBFiled<T, K extends keyof T = never> = Omit<T, K | DefaultDBFields>;
