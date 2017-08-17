import { login, getInfo } from '@/api/api'
import { getToken, setToken, removeToken } from '@/utils/auth'
const user = {
  state: {
    user: {},
    status: {},
    token: getToken()
  },
  mutations: {
    SET_INFO (state, user) {
      state.user = user
    },
    SET_STATUS (state, status) {
      state.status = status
    },
    SET_TOKEN (state, token) {
      state.token = token
    },
    LOGOUT_USER (state) {
      state.user = {}
      state.status = {}
    }
  },
  actions: {
    // 用户登录
    UserLogin ({ commit }, loginParams) {
      return login(loginParams).then(res => {
        const status = res
        commit('SET_STATUS', status)
        if (status.code == 200) {
          commit('SET_TOKEN', status.token)
          setToken(status.token)
        }
      })
    },
    GetInfo ({ commit, state }) {
      const para = { token: state.token }
      return getInfo(para).then(res => {
        const data = res.data
        commit('SET_INFO', data)
      })
    },
    // 退出登录
    LogOut ({ commit }) {
      removeToken()
      commit('LOGOUT_USER')
    }
  }
}

export default user
