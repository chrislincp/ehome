const app = {
  state: {
    sidebar: true
  },
  mutations: {
    TOGGLE_BAR (state) {
      state.sidebar = !state.sidebar
    }
  },
  actions: {
    toggleSideBar ({commit}) {
      commit('TOGGLE_BAR')
    }
  }
}

export default app
