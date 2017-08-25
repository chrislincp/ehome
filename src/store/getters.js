const getters = {
  user: state => state.user.user,
  status: state => state.user.status,
  sidebar: state => state.app.sidebar,
  structureData: state => state.config.structureData,
  brands: state => state.config.brands,
  brandsType: state => state.config.brandsType
}

export default getters
