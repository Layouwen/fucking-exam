import _ from "lodash";

export function omit<T extends Record<string, any>>(
  obj: T,
  excludeFields: string[]
) {
  return _.omit(obj, excludeFields) as T;
}

export function omitByArray<T extends Record<string, any>>(
  arr: T[],
  excludeFields: string[]
) {
  return arr.map((i) => omit(i, excludeFields)) as T[];
}
