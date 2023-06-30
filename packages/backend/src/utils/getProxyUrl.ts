import config from "../config";

export async function getProxyUrl(alias: string, url: string, path: string) {
  const _url = config.proxy.url;
  return _url ? `${_url}/${alias}${path}` : `${url}${path}`;
}
