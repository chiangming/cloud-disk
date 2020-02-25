import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

Vue.use(Vuex)

const data = {
  0: {
    id: 0,
    time: '2017-10-10 13:04:01',
    name: '全部',
    size: '2G',
    type: 'folder',
    checked: false,
    edit: false
  },
  1: {
    id: 1,
    pId: 0,
    time: '2017-10-10 14:04:01',
    name: '音乐',
    size: '60M',
    type: 'folder_m',
    checked: false,
    edit: false
  },
  2: {
    id: 2,
    pId: 0,
    time: '2017-10-10 13:04:05',
    name: '电影',
    size: '100M',
    type: 'folder_f',
    checked: false,
    edit: false
  },
  3: {
    id: 3,
    pId: 0,
    time: '2017-10-10 13:04:03',
    name: '图库',
    size: '40M',
    type: 'folder',
    checked: false,
    edit: false
  },
  4: {
    id: 4,
    pId: 1,
    time: '2017-10-10 15:04:01',
    name: '宫崎骏',
    size: '40M',
    type: 'folder_m',
    checked: false,
    edit: false
  },
  5: {
    id: 5,
    pId: 1,
    time: '2017-10-10 14:20:01',
    name: '轻音乐',
    size: '20M',
    type: 'folder_m',
    checked: false,
    edit: false
  },
  6: {
    id: 6,
    pId: 3,
    time: '2017-10-10 17:04:01',
    name: '我的照片',
    size: '30M',
    type: 'folder',
    checked: false,
    edit: false
  },
  7: {
    id: 7,
    pId: 3,
    time: '2017-10-10 16:04:01',
    name: '我的童年',
    size: '10M',
    type: 'folder',
    checked: false,
    edit: false
  },
  8: {
    id: 8,
    pId: 6,
    time: '2017-10-10 18:04:01',
    name: 'IMG_20151122_125510.jpg',
    size: '1.72MB',
    type: 'image',
    src: 'http://omqyp2bk2.bkt.clouddn.com/IMG_20151122_125510.jpg',
    checked: false,
    edit: false
  },
  9: {
    id: 9,
    pId: 6,
    time: '2017-10-10 19:04:01',
    name: 'IMG_20150903_105329.jpg',
    size: '2.41MB',
    type: 'image',
    src: 'http://omqyp2bk2.bkt.clouddn.com/IMG_20150903_105329.jpg',
    checked: false,
    edit: false
  },
  10: {
    id: 10,
    pId: 6,
    time: '2017-10-10 20:04:01',
    name: 'IMG_20151202_140357.jpg',
    size: '1.90MB',
    type: 'image',
    src: 'http://omqyp2bk2.bkt.clouddn.com/IMG_20151202_140357.jpg',
    checked: false,
    edit: false
  },
  11: {
    id: 11,
    pId: 4,
    time: '2017-10-10 21:04:01',
    name: '久石譲 - “天空の城ラピュタ”~君をのせて.mp3',
    size: '5.4M',
    type: 'music',
    checked: false,
    edit: false
  },
  12: {
    id: 12,
    pId: 4,
    time: '2017-10-10 22:04:01',
    name: 'V.A. - “魔女の宅急便”~海の见える街.mp3',
    size: '6.75M',
    type: 'music',
    checked: false,
    edit: false
  },
  13: {
    id: 13,
    pId: 4,
    time: '2017-10-10 23:04:01',
    name: '木村弓 - “千と千寻の神隠し”~いつも何度でも.mp3',
    size: '8.45M',
    type: 'music',
    checked: false,
    edit: false
  },
  14: {
    id: 14,
    pId: 5,
    time: '2017-10-10 23:20:01',
    name: '神山纯一 - 森と水の幻想曲.mp3',
    size: '6.78M',
    type: 'music',
    checked: false,
    edit: false
  },
  15: {
    id: 15,
    pId: 2,
    time: '2017-10-10 23:20:01',
    name: 'My Movie',
    size: '60M',
    type: 'folder_f',
    checked: false,
    edit: false
  },
  16: {
    id: 16,
    pId: 0,
    time: '2017-11-10 10:20:00',
    name: '我的应用',
    size: '20M',
    type: 'zip',
    checked: false,
    edit: false
  },
  17: {
    id: 17,
    pId: 0,
    time: '2017-11-10 10:40:00',
    name: '备忘录',
    size: '10M',
    type: 'folder',
    checked: false,
    edit: false
  },
  18: {
    id: 18,
    pId: 15,
    time: '2017-11-10 10:40:00',
    name: '锤子宣传片',
    size: '200M',
    type: 'video',
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
    eventType: null
  },
  mutations,
  getters,
  actions,
  modules: {}
})
