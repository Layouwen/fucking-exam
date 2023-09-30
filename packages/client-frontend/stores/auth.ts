import { AuthLoginResponseData } from '@fucking-exam/shared'
import { loginApi, registerApi } from '~/api'

type AuthStoreState = {
  token: string
  user?: AuthLoginResponseData['user']
}

const customLocalStorage = {
  getItem: (key: string): string | null => {
    if (process.client) {
      return localStorage.getItem(key)
    }
    return null
  },
  setItem: (key: string, value: string) => {
    if (process.client) {
      localStorage.setItem(key, value)
    }
  }
}

export const useAuthStore = defineStore('auth', {
  state: () =>
    ({
      token: '',
      user: undefined,
    } as AuthStoreState),
  getters: {
    isLogin: state => !!state.token,
  },
  actions: {
    async register(data: { email: string; password: string; code: string }) {
      const res = await registerApi(data)

      if (res.code === 200) {
        this.token = res.data.token
        this.user = res.data.user
      }

      return res
    },
    async login(data: { email: string; password: string }) {
      const res = await loginApi(data)

      if (res.code === 200) {
        this.token = res.data.token
        this.user = res.data.user
      }

      return res
    },
    logout() {
      this.token = ''
    },
  },
  persist: {
    storage: customLocalStorage,
  }
})
