import { getStructureData, postStructureData, getBrands, getBrandsType, brandSubmit, deleteBrand } from '@/api/api'

const config = {
  state: {
    structureData: [],
    brands: [],
    brandsType: []
  },
  mutations: {
    STRUCTURE_DATA (state, data) {
      state.structureData = data
    },
    SET_BRANDS (state, data) {
      state.brands = data
    },
    SET_BRANDS_TYPE (state, data) {
      state.brandsType = data
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
    GetBrands ({ commit }) {
      return getBrands().then(res => {
        commit('SET_BRANDS', res.data)
      })
    },
    GetBrandsType ({ commit }) {
      return getBrandsType().then(res => {
        commit('SET_BRANDS_TYPE', res.data)
      })
    },
    BrandSubmit ({ commit }, params) {
      return brandSubmit(params)
    },
    DeleteBrand ({ commit }, params) {
      return deleteBrand(params)
    }
  }
}

export default config
