import { getStructureData, postStructureData } from '@/api/api'

const config = {
  state: {
    structureData: []
  },
  mutations: {
    STRUCTURE_DATA (state, data) {
      state.structureData = data
    }
  },
  actions: {
    GetStructureData ({ commit, state }) {
      const params = { type: 1, fc: 1, UserID: 42, Visibility: 1 }
      return getStructureData(params).then(res => {
        console.log(res.data)
        commit('STRUCTURE_DATA', res.data)
      })
    },
    PostStructure ({ commit }, params) {
      return postStructureData(params)
    },
  }
}

export default config
