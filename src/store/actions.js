const actions = {
  changeMenu: ({ commit }, payload) => {
    return commit('CHANGE_MENU', payload)
  },
  changeCurrentListId: ({ commit }, payload) => {
    return commit('CHANGE_CURRENT_LIST_ID', payload)
  },
  changeChecked: ({ commit }, payload) => {
    return commit('CHANGE_CHECKED', payload)
  },
  changeCheckedAll: ({ commit }, payload) => {
    return commit('CHANGE_CHECKED_ALL', payload)
  },
  changeCurrentListBuffer: ({ commit }, payload) => {
    return commit('CHANGE_CURRENT_LIST_BUFFER', payload)
  },
  changeData: ({ commit }, payload) => {
    return commit('CHANGE_DATA', payload)
  },
  changeView: ({ commit }, payload) => {
    return commit('CHANGE_VIEW', payload)
  },
  changeRank: ({ commit }, payload) => {
    return commit('CHANGE_RANK', payload)
  },
  changeEdit: ({ commit }, payload) => {
    return commit('CHANGE_EDIT', payload)
  },
  changeName: ({ commit }, payload) => {
    return commit('CHANGE_NAME', payload)
  },
  deleteDate: ({ commit }, payload) => {
    return commit('DELETE_DATE', payload)
  },
  addNewFolder: ({ commit }, payload) => {
    return commit('ADD_NEW_FOLDER', payload)
  },
  moveTarget: ({ commit }, payload) => {
    return commit('MOVE_TARGET', payload)
  }
}

export default actions
