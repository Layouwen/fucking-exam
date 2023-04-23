type ResponseOption = {
  data?: any;
  msg?: string;
  code?: number;
};

class ResponseBase {
  public data?: any;

  constructor(public code: number, public msg: string, data: any) {
    if (data) {
      this.data = data;
    }
  }
}

export class ResponseSuccess extends ResponseBase {
  constructor({ data, msg = "success", code = 200 }: ResponseOption = {}) {
    super(code, msg, data);
  }
}

export class ResponseError extends ResponseBase {
  constructor({ data, msg = "error", code = 400 }: ResponseOption = {}) {
    super(code, msg, data);
  }
}
