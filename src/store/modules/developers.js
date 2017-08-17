const deve = {
  state: {
    list: []
  },
  mutations: {
    SET_LIST (state, list) {
      state.list = list
    }
  },
  actions: {
    GetList ({ commit }) {
      // get request
      return getDeveloper().then(res => {
        const list = res.data
        commit('SET_LIST', list)
      })
    },
    AddDeveloper ({ commit }, row) {
      // post request
      const para = { row }
      return postNewDeveloper(para).then(res => {

      })
    }
  }
}
