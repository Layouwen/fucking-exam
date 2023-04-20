import { NitroFetchRequest, NitroFetchOptions } from "nitropack";
import * as process from "process";

const requestInstance = $fetch.create({
  baseURL: process.env.NODE_ENV === "development" ? "/" : "http://easyhappy.top:5000",
});

function request<R>(
  request: NitroFetchRequest,
  options?: NitroFetchOptions<any>
) {
  const _options = { headers: {}, ...options };
  const token = localStorage.getItem("token");
  if (token) {
    // @ts-ignore
    _options.headers.authorization = "Bearer " + localStorage.getItem("token");
  }
  return requestInstance<R>(request, _options);
}

export default request;
