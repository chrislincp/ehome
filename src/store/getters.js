const getters = {
  user: state => state.user.user,
  status: state => state.user.status,
  sidebar: state => state.app.sidebar,
  structureData: state => state.config.structureData
}

export default getters
