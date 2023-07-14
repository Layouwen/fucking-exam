import { MessagePlugin } from 'tdesign-vue-next'

const requestInstance = $fetch.create({
  baseURL: process.env.NODE_ENV === 'development' ? '/' : 'http://easyhappy.top',
  // baseURL: "http://localhost:3000",
  onRequest: ({ options }) => {
    if (!options.headers) options.headers = []

    const token = localStorage.getItem('token')
    if (token && options.headers instanceof Array) {
      options.headers.push(['authorization', `Bearer ${token}`])
    }
  },
  onResponse: ({ response }) => {
    const { _data } = response
    switch (_data.code) {
      case 419:
        localStorage.removeItem('token')
        MessagePlugin.warning('登录过期')
        setTimeout(() => navigateTo('/login'), 400)
        break
      case 498:
        localStorage.removeItem('token')
        MessagePlugin.warning('无效的令牌')
        setTimeout(() => navigateTo('/login'), 400)
      default:
        break
    }
  },
})

export default requestInstance
