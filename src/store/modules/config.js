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
    GetStructureData ({ commit, state }, params) {
      return getStructureData(params).then(res => {
        commit('STRUCTURE_DATA', res.data)
      })
    },
    PostStructure ({ commit }, params) {
      return postStructureData(params)
    },
  }
}

export default config
