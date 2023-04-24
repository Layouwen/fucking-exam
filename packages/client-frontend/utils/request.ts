import { NitroFetchRequest, NitroFetchOptions } from "nitropack";

const requestInstance = $fetch.create({
  baseURL:
    process.env.NODE_ENV === "development" ? "/" : "http://easyhappy.top",
  // baseURL: "http://localhost:3000",
});

function request<R>(
  request: NitroFetchRequest,
  options?: NitroFetchOptions<any>
) {
  const _options = { headers: {}, ...options };
  const token = localStorage.getItem("token");
  if (token) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    _options.headers.authorization = "Bearer " + localStorage.getItem("token");
  }
  return requestInstance<R>(request, _options);
}

export default request;
