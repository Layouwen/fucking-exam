export interface ResponseBase {
  code: number
  msg: string
}

export interface ResponseBaseData<D = any> {
  code: number
  msg: string
  data?: D
}
