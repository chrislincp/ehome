import { getProductsFilter, getProductData, productFormPost } from '@/api/api'
const products = {
  state: {
    productsFilters: {
      brand: [],
      style: [],
      type: []
    },
    productData: {
      ET: '',
      exhibit: '0',
      state: '0',
      style: '',
      brand: '',
      pic: [],
      shop: [],
      tag: [],
      type: []
    },
    noProduct: false,
    fullscreenLoading: false,
    productStep: 0
  },
  mutations: {
    SET_FILTERS (state, data) {
      state.productsFilters = data
    },
    SET_PRODUCT_DATA (state, data) {
      state.productData = data.data
      state.noProduct = data.visible
    },
    SET_STEP (state, data) {
      state.productStep = data
    },
    SET_LOADING (state) {
      state.fullscreenLoading = !state.fullscreenLoading
    }
  },
  actions: {
    GetProductsFilter ({ commit }) {
      return getProductsFilter().then(res => {
        commit('SET_FILTERS', res.data)
      })
    },
    GetProductData ({ commit }, params) {
      return getProductData(params)
    },
    SetProductStep ({ commit }, params) {
      commit('SET_STEP', params)
    },
    ProductFormPost ({ commit }, params) {
      return productFormPost(params)
    }
  }
}

export default products
