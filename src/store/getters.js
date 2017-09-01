const getters = {
  user: state => state.user.user,
  status: state => state.user.status,
  sidebar: state => state.app.sidebar,
  structureData: state => state.config.structureData,
  brands: state => state.config.brands,
  brandsType: state => state.config.brandsType,
  productsFilters: state => state.products.productsFilters,
  productData: state => state.products.productData,
  noProduct: state => state.products.noProduct,
  productStep: state => state.products.productStep,
  fullscreenLoading: state => state.products.fullscreenLoading,
}

export default getters
