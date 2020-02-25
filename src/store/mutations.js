import {
  getChildrenById,
  deleteItemById,
  getCheckedFileFromBuffer,
  clock
} from '../utils/utils'

const mutations = {
  CHANGE_MENU: (state, payload) => {
    state.type = payload.type
  },
  CHANGE_CURRENT_LIST_ID: (state, payload) => {
    state.currentListId = payload.id
  },
  CHANGE_CHECKED: (state, payload) => {
    const id = payload.id
    state.currentListBuffer = state.currentListBuffer.map((item) => {
      if (item.id === payload.id) {
        item.checked = !item.checked
        if (item.checked) {
          state.checkedBuffer[id] = item
          state.checkedBuffer.length++
        } else {
          delete state.checkedBuffer[id]
          state.checkedBuffer.length--
        }
      }
      return item
    })
    if (state.checkedBuffer.length === state.currentListBuffer.length) {
      state.checkAll = true
    } else {
      state.checkAll = false
    }
  },
  CHANGE_CHECKED_ALL: (state, payload) => {
    function checkHandle (checked) {
      if (checked) {
        state.checkAll = false
        state.checkedBuffer = { length: 0 }
        state.currentListBuffer = state.currentListBuffer.map((item) => {
          item.checked = false
          return item
        })
      } else {
        state.checkAll = true
        state.checkedBuffer = { length: 0 }
        state.currentListBuffer = state.currentListBuffer.map((item) => {
          item.checked = true
          state.checkedBuffer[item.id] = item
          state.checkedBuffer.length++
          return item
        })
      }
    }
    if (payload) {
      checkHandle(!payload.checkAll)
    } else {
      checkHandle(state.checkAll)
    }
  },
  CHANGE_CURRENT_LIST_BUFFER: (state) => {
    const type = state.type
    let data = Object.values(state.data)
    if (type === 'folder') {
      data = getChildrenById(state.data, state.currentListId)
    } else if (type === '文档') {
      data = data.filter(item => {
        return item.type === 'text'
      })
    } else if (type === '图片') {
      data = data.filter(item => {
        return item.type === 'image'
      })
    } else if (type === '视频') {
      data = data.filter(item => {
        return item.type === 'video'
      })
    } else if (type === '音乐') {
      data = data.filter(item => {
        return item.type === 'music'
      })
    }
    state.currentListBuffer = data
  },
  CHANGE_DATA: (state, payload) => {
    const newData = payload.newData
    newData.name = payload.newName
    state.data[payload.id] = newData
  },
  CHANGE_VIEW: (state, payload) => {
    state.view = payload.view
  },
  CHANGE_RANK: (state, payload) => {
    state.rank = payload.rank
  },
  CHANGE_EDIT: (state, payload) => {
    state.currentListBuffer = state.currentListBuffer.map((item) => {
      if (item.id === payload.id * 1) {
        item.edit = !item.edit
      }
      return item
    })
  },
  CHANGE_NAME: (state, payload) => {
    console.log(payload)
    state.data[payload.id].name = payload.newName
  },
  DELETE_DATE: state => {
    const data = getCheckedFileFromBuffer(state.checkedBuffer)
    const len = data.length
    for (let i = 0; i < len; i++) {
      const item = data[i]
      const fileId = item.id
      deleteItemById(state.data, fileId)
    }
  },
  ADD_NEW_FOLDER: (state, payload) => {
    const newData = {
      id: payload.id,
      pId: state.currentListId,
      time: clock(),
      name: '新建文件夹',
      size: '--',
      type: 'folder',
      checked: true,
      edit: false
    }
    state.checkedBuffer[payload.id] = newData
    state.checkedBuffer.length++
    state.currentListBuffer.push(newData)
  },
  MOVE_TARGET: (state, payload) => {
    state.data[payload.id].pId = payload.targetId
  },
  SET_EVENT: (state, payload) => {
    state.eventType = payload
  }
}

export default mutations
