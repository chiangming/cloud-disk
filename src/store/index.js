import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

Vue.use(Vuex)

const data = {
  0: {
    id: 0,
    time: '2019-12-25 13:04:01',
    name: '全部',
    size: '4G',
    type: 'folder',
    checked: false,
    edit: false
  }
}

export default new Vuex.Store({
  state: {
    data,
    type: 'folder',
    currentListId: 0, // 当前文件的id
    checkedBuffer: { length: 0 }, // 当前选中的文件，以及选中的个数
    currentListBuffer: [],
    moveTargetId: 0,
    view: 'thumbnail',
    rank: 'name',
    checkAll: false,
    eventType: null,
    showUpload: false
  },
  mutations,
  getters,
  actions,
  modules: {}
})
