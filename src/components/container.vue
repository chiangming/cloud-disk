<template>
  <div class="container" @click.left.self="contextMenuclose" @click.right.prevent="contextMenu1Handle">
    <div v-if="list.length">
      <div v-if="view === 'thumbnail'">
        <ul id="thumbnail">
          <li v-for="item in list" :class="['list-item', {'checked': item.checked}]" :key="item.id" @click.right.stop.prevent="contextMenu2Handle($event, item.id, item)">
            <div class="list-item-content" >
              <Checkbox size="large" class="checkbox" :value="item.checked" @on-change="checkHandle(item.id)"></Checkbox>
              <div class="item-image" @click="into(item.id, item.type,item)">
                <img src="../assets/images/folder.png" class="big-image" v-if="item.type === 'folder'">
                <img src="../assets/images/folder_f.png" class="big-image" v-else-if="item.type === 'folder_f'">
                <img src="../assets/images/folder_m.png" class="small-image" v-else-if="item.type === 'folder_m'">
                <img src="../assets/images/zip.png" class="small-image" v-else-if="item.type === 'zip'">
                <img :src="item.src" class="auto-image" v-else-if="item.type === 'image'">
                <img src="../assets/images/music.png" class="big-image" v-else-if="item.type === 'music'">
                <img src="../assets/images/video.png" class="small-image" v-else-if="item.type === 'video'">
              </div>
              <span class="folder-name" v-if="!item.edit">{{item.name}}</span>
              <input
                @blur="editDoneBlur(item.id)"
                @keydown.13="editDoneEnter"
                @keydown.esc="cancelEdit"
                type="text"
                ref="editInput"
                v-if="item.edit"
                class="folder-name-edit"
                v-model.trim="newName"
              >
            </div>
          </li>
        </ul>
      </div>
      <div v-else>
      <table class="list" >
        <thead>
          <tr class="table-line" v-if="!checkAll">
            <th><Checkbox size="large" class="checkbox" :value="checkAll" @on-change="checkAllHandle"></Checkbox></th>
            <th>名称</th>
            <th>上次修改时间
              <!-- <i class="icon-arrow-down"></i> -->
            </th>
            <th>大小</th>
          </tr>
          <tr class="table-line" v-else>
            <th><Checkbox size="large" class="checkbox" :value="checkAll" @on-change="checkAllHandle"></Checkbox></th>
            <th colspan="3">已选中{{checkedLen}}个文件/文件夹</th>
          </tr>
        </thead>
        <tbody id="listInfo">
          <tr v-for="item in list" :key="item.id" :class="{'table-line':true,'checked': item.checked}" @click.right.stop.prevent="contextMenu2Handle($event, item.id, item)">
            <td>
              <Checkbox size="large" class="checkbox" :value="item.checked" @on-change="checkHandle(item.id)"></Checkbox>
            </td>
            <td>
              <div class="file-icon" @click="into(item.id, item.type,item)">
                <img src="../assets/images/folder.png" class="t-big-image" v-if="item.type === 'folder'">
                <img src="../assets/images/folder_f.png" class="t-big-image" v-else-if="item.type === 'folder_f'">
                <img src="../assets/images/folder_m.png" class="t-small-image" v-else-if="item.type === 'folder_m'">
                <img src="../assets/images/zip.png" class="t-small-image" v-else-if="item.type === 'zip'">
                <img :src="item.src" class="t-auto-image" v-else-if="item.type === 'image'">
                <img src="../assets/images/music.png" class="t-big-image" v-else-if="item.type === 'music'">
                <img src="../assets/images/video.png" class="t-small-image" v-else-if="item.type === 'video'">
              </div>
              <div class="file-name">
                <span class="name-text" v-if="!item.edit" :value="item.name">{{item.name}}</span>
                <input
                  @blur="editDoneBlur(item.id)"
                  @keydown.13="editDoneEnter"
                  @keydown.esc="cancelEdit"
                  class="name-input"
                  ref="editInput"
                  v-if="item.edit"
                  type="text"
                  v-model.trim="newName"
                >
              </div>
            </td>
            <td>{{item.time}}</td>
            <td>{{item.size}}</td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
    <div class="empty" v-else @click.left.self="contextMenuclose">
      <img src="../assets/images/icon-nopicture@2x.png">
      <p>暂无更多内容</p>
    </div>
    <uploader class="uploader"></uploader>
    <Menu theme="light" class="contextMenu" :style="{left: contextMenuLeft, top: contextMenuTop}" v-if="contextMenu1" @on-select.self="rightHandle1" accordion active-name="2-2" :open-names="['1']">
      <MenuItem name="1">刷新</MenuItem>
      <Submenu name="2">
        <template slot="title">
          视图
        </template>
        <MenuItem name="2-1">
         <Icon type="checkmark" :color="view === 'list' ? '#0097EB' : 'rgba(255,255,255,0)'"></Icon>
         <span :style="{color: view === 'list' ? '#0097EB' : '#495060'}">列表</span>
        </MenuItem>
        <MenuItem name="2-2">
          <Icon type="checkmark" :color="view === 'thumbnail' ? '#0097EB' : 'rgba(255,255,255,0)'"></Icon>
          <span :style="{color: view === 'thumbnail' ? '#0097EB' : '#495060'}">缩略图</span>
        </MenuItem>
      </Submenu>
      <Submenu name="3">
        <template slot="title">
          排序
        </template>
        <MenuItem name="3-1">
          <Icon type="checkmark" :color="rank === 'name' ? '#0097EB' : 'rgba(255,255,255,0)'"></Icon>
          <span :style="{color: rank === 'name' ? '#0097EB' : '#495060'}">名称</span>
        </MenuItem>
        <MenuItem name="3-2">
          <Icon type="checkmark" :color="rank === 'time' ? '#0097EB' : 'rgba(255,255,255,0)'"></Icon>
          <span :style="{color: rank === 'time' ? '#0097EB' : '#495060'}">上次修改时间</span>
        </MenuItem>
      </Submenu>
      <MenuItem name="4">新建文件夹</MenuItem>
    </Menu>
    <Menu theme="light" class="contextMenu" :style="{left: contextMenuLeft, top: contextMenuTop}" v-if="contextMenu2" @on-select.self="rightHandle2">
      <MenuItem name="1">下载</MenuItem>
      <MenuItem name="2" disabled>分享</MenuItem>
      <MenuItem name="3">移动到</MenuItem>
      <MenuItem name="4">重命名</MenuItem>
      <MenuItem name="5">删除</MenuItem>
    </Menu>
    <Modal
      v-model="modal3"
      :title="currItem.name"
      class-name="vertical-center-modal"
      width=830
      :mask-closable="false"
      @on-ok="closeModal"
      @on-cancel="closeModal">
      <video id="video1" width="800" height="500" controls ref="myVideo">
        <source type="video/mp4" ref="video">
        您的浏览器不支持 HTML5 video 标签。
      </video>
    </Modal>
    <Modal
      v-model="modal4"
      :title="currItem.name"
      class-name="vertical-center-modal"
      width=830
      :mask-closable="false"
      @on-ok="closeAudioModal"
      @on-cancel="closeAudioModal">
      <audio id="audio1"  controls="controls" loop="loop" ref="myAudio">
        <source type="audio/mpeg" ref="audio" />
        您的浏览器不支持 audio 标签。
      </audio>
    </Modal>
  </div>
</template>

<script>
import { Checkbox, Message, Menu, Submenu, MenuItem, Icon, Modal } from 'view-design'
import { nameCanUse } from '../utils/utils.js'
import { mapState, mapGetters } from 'vuex'
import uploader from './uploader'
import mixin from '@/store/mixin.js'
// import axios from 'axios'

export default {
  name: 'container',
  mixins: [mixin],
  components: {
    Checkbox,
    Menu,
    Submenu,
    MenuItem,
    Icon,
    uploader,
    Modal
  },
  data () {
    return {
      newName: '',
      oldName: '',
      cancelRename: false,
      contextMenu1: false,
      contextMenu2: false,
      contextMenuLeft: '0px',
      contextMenuTop: '0px',
      modal3: false,
      modal4: false,
      currItem: {
        title: '',
        src: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      list: 'currentListBufferR'
    }),
    ...mapState([
      'view',
      'rank',
      'checkedBuffer',
      'data',
      'currentListId'
    ]),
    checkAll () {
      return this.$store.state.checkAll
    },
    checkedLen () {
      return this.$store.state.checkedBuffer.length
    }
  },
  methods: {
    into (id, type, item) {
      if (type === 'video') {
        this.currItem = item
        this.modal3 = true
        this.$refs.video.src = this.currItem.src
        this.$nextTick(() => {
          this.$refs.myVideo.load()
        })
      }
      if (type === 'music') {
        this.currItem = item
        this.modal4 = true
        this.$refs.audio.src = this.currItem.src
        this.$nextTick(() => {
          this.$refs.myAudio.load()
        })
        // return Message.error('此文件类型不能预览，建议下载后打开！')
      }
      if (type === 'zip') {
        return Message.error('此文件类型不能预览，建议下载后打开！')
      }
      if (type !== 'folder' && type !== 'folder_f' && type !== 'folder_m') return
      this.changeCurrentListId({ id })
      this.changeCheckedAll({ checkAll: false })
      this.changeCurrentListBuffer()
    },
    checkHandle (id) {
      this.changeChecked({ id })
    },
    checkAllHandle () {
      this.changeCheckedAll()
    },
    editDoneBlur (id) {
      if (this.cancelRename) {
        return this.changeEdit({ id })
      }
      if (!this.newName) {
        this.$refs.editInput[0].select()
        return Message.error('文件(夹)名不能为空，请输入文件名称')
      }
      if (this.newName === this.oldName && this.oldName !== '新建文件夹') {
        return this.changeEdit({ id })
      }
      if (this.oldName === '新建文件夹') {
        if (nameCanUse(this.data, this.currentListId, this.newName)) {
          this.changeData({ id, newData: this.checkedBuffer[id], newName: this.newName })
          this.changeEdit({ id })
          return Message.success('新建文件夹成功！')
        } else {
          this.$refs.editInput[0].select()
          return Message.error('命名冲突！')
        }
      }
      if (nameCanUse(this.data, this.currentListId, this.newName)) {
        this.changeName({ id, newName: this.newName })
        Message.success('重命名成功！')
      } else {
        this.$refs.editInput[0].select()
        return Message.error('命名冲突！')
      }
      this.changeEdit({ id })
    },
    editDoneEnter () {
      this.$refs.editInput[0].blur()
    },
    cancelEdit () {
      this.cancelRename = true
      this.$refs.editInput[0].blur()
    },
    contextMenuclose () {
      if (this.contextMenu1 === true) {
        this.contextMenu1 = false
      }
      if (this.contextMenu2 === true) {
        this.contextMenu2 = false
      }
      this.$store.commit('SHOW_UPLOAD', { upload: false })
    },
    contextMenu1Handle (e) {
      // console.log('Meun1')
      this.contextMenu1 = true
      this.contextMenu2 = false
      let left = e.pageX
      let top = e.pageY
      const screenWidth = window.innerWidth
      const screenHeight = window.innerHeight
      if (left + 240 >= screenWidth) {
        left = screenWidth - 240
      }
      if (top < e.target.offsetTop) {
        top = e.target.offsetTop
      }
      if (top + 296 >= screenHeight) {
        top = screenHeight - 296
      }
      this.contextMenuLeft = left + 'px'
      this.contextMenuTop = top + 'px'
    },
    rightHandle1 (name) {
      this.contextMenu2 = false
      if (name === '1') return
      if (name === '2-1') {
        this.changeView({ view: 'list' })
      }
      if (name === '2-2') {
        this.changeView({ view: 'thumbnail' })
      }
      if (name === '3-1') {
        this.changeRank({ rank: 'name' })
      }
      if (name === '3-2') {
        this.changeRank({ rank: 'time' })
      }
      if (name === '4') {
        this.changeCheckedAll({ checkedAll: false })
        const id = Date.now()
        this.addNewFolder({ id })
        this.newName = this.oldName = this.checkedBuffer[id].name
        this.cancelRename = false
        this.changeEdit({ id })
        this.$nextTick(function () { // input要获取焦点等到DOM渲染完成触发回调函数
          this.$refs.editInput[0].focus()
        })
      }
    },
    contextMenu2Handle (e, id, item) {
      this.currItem = item
      const targetInBuffer = Object.keys(this.checkedBuffer).some((item) => {
        return item * 1 === id
      })
      if (!targetInBuffer) {
        this.changeCheckedAll({ checkAll: false })
        this.changeChecked({ id })
      }
      this.contextMenu1 = false
      this.contextMenu2 = true
      let left = e.pageX
      let top = e.pageY
      const screenWidth = window.innerWidth
      const screenHeight = window.innerHeight
      if (left + 240 >= screenWidth) {
        left = screenWidth - 240
      }
      if (top < e.target.offsetTop) {
        top = e.target.offsetTop
      }
      if (top + 296 >= screenHeight) {
        top = screenHeight - 296
      }
      this.contextMenuLeft = left + 'px'
      this.contextMenuTop = top + 'px'
    },
    rightHandle2 (name) {
      // console.log(this.currItem)
      this.contextMenu1 = false
      if (name === '1') {
        const type = this.currItem.type
        if (type === 'folder' || type === 'folder_f' || type === 'folder_m') {
          return Message.error('暂不支持文件夹下载')
        }
        var eleLink = document.createElement('a')
        eleLink.download = this.currItem.name
        eleLink.style.display = 'none'
        // 字符内容转变成blob地址
        var blob = new Blob([this.currItem.src])
        eleLink.href = URL.createObjectURL(blob)
        // 触发点击
        document.body.appendChild(eleLink)
        eleLink.click()
        // 然后移除
        document.body.removeChild(eleLink)
      }
      if (name === '3') {
        this.$store.$emit('moveFolderTo')
      }
      if (name === '4') {
        this.$store.$emit('rename')
      }
      if (name === '5') {
        this.$store.$emit('deleteFolder')
      }
    },
    closeModal () {
      this.$refs.myVideo.pause()
      this.modal3 = false
    },
    closeAudioModal () {
      this.$refs.myAudio.pause()
      this.modal4 = false
    }
  },
  mounted () {
    this.$store.$on('rename', (e) => {
      if (this.checkedBuffer.length === 0) {
        return Message.error('请选中一个文件进行编辑！')
      }
      if (this.checkedBuffer.length > 1) {
        return Message.error('只能选中一个文件进行编辑！')
      }
      const id = Object.keys(this.checkedBuffer).map(item => {
        if (item !== 'length') {
          return item
        }
      })[0]
      this.newName = this.oldName = this.checkedBuffer[id].name
      this.cancelRename = false
      this.changeEdit({ id })
      this.$nextTick(function () { // input要获取焦点等到DOM渲染完成触发回调函数
        this.$refs.editInput[0].focus()
      })
    })
    this.$store.$on('addNewFolderHandle', (e) => {
      this.changeCheckedAll({ checkedAll: false })
      const id = Date.now()
      this.addNewFolder({ id })
      this.newName = this.oldName = this.checkedBuffer[id].name
      this.cancelRename = false
      this.changeEdit({ id })
      this.$nextTick(function () { // input要获取焦点等到DOM渲染完成触发回调函数
        this.$refs.editInput[0].focus()
      })
    })
  }
}
</script>

<style scoped>
  .uploader{
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
    background: rgba(255,255,255,0.8)
  }
  #video1{
    outline: none;
  }
  #audio1{
    width:100%;
    outline: none;
  }
  .item-image{
    margin-top: 10px;
  }
  .container {
    background-color: #fff;
    flex: 1;
  }
  #thumbnail{
    margin: 5px 5px 5px 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  #thumbnail .list-item {
    width:130px;
    height: 130px;
    padding: 5px;
    margin: 5px;
    color: #020202;
    list-style-type:none;
  }
  #thumbnail .list-item.checked {
    background-color: #f1f5fa;
  }
  #thumbnail .list-item:hover {
    background-color: #f1f5fa;
  }
  .table-line .checkbox{
    display: none;
  }
  .table-line:hover{
    background-color: #D5D7DF;
  }
  .table-line:hover .checkbox{
    display: block;
  }

  .checked .checkbox{
    display: block;
  }

  #thumbnail .list-item:hover .checkbox {
    visibility: visible;
  }
  #thumbnail .list-item.checked .checkbox {
    visibility: visible;
  }
  #thumbnail .list-item-content {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
  }
  #thumbnail .list-item-content .checkbox {
    position: absolute;
    right:0;
    top:0;
  }
  #thumbnail .folder-name {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .folder-name-edit {
    width: 100%;
    margin: 0 auto;
    text-align: center;
    height: 30px;
    border: 1px solid #C8CCD3;
    background: #fff;
  }
  .big-image {
    width: 60px;
  }
  .small-image {
    width: 50px;
    margin: 5px;
  }
  .auto-image {
    max-width: 80px;
    max-height: 60px;
  }
  #thumbnail .checkbox {
    visibility: hidden;
    align-self: flex-start
  }
  .list {
    width: 100%;
    border-collapse: collapse;
    color: #020202;
  }
  .list thead {
    margin: 10px 60px 10px 20px;
    width: 100%;
    height: 60px;
    line-height: 60px;
  }
  .list thead tr th:nth-child(1) {
    width: 5%;
    border-bottom: none;
  }
  .list thead tr th {
    text-align: left;
    border-bottom: 1px solid #D5D7DF;
  }
  .list thead tr th:hover {
    background-color: #D5D7DF;
  }
  .list tbody tr.checked {
    background-color: #D5D7DF;
  }
  .list tbody tr:hover {
    background-color: #D5D7DF;
  }
  .list tbody tr {
    margin: 10px 60px 10px 20px;
    width: 100%;
    height: 60px;
    line-height: 60px;
  }
  .list tbody tr td:nth-child(1) {
    border-bottom: none;
  }
  .list tbody tr td {
    border-bottom: 1px solid #D5D7DF;
  }
  td, th {
    font-family: -apple-system;
    line-height: 60px;
    vertical-align: middle;
  }
  .list .checkbox {
    margin-left: 20px;
  }
  .t-big-image {
    width: 30px;
    height: 30spx;
    margin-bottom: -5px;
  }
  .t-small-image {
    width: 26px;
    height: 26px;
    margin-bottom: -5px;
  }
  .t-auto-image {
    width: 26px;
    height: 26px;
    margin-bottom: -5px;
  }
  .list .file-icon {
    display: inline-block;
    width: 40px;
    height: 55px;
    padding-top: 5px;
  }
  .list .file-name {
    display: inline-block;
  }
  .list .name-text {
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0 auto;
    max-width: 70%;
    height: 40px;
  }
  .list .name-input {
    width: 100%;
    margin: 0 auto;
    text-align: center;
    height: 30px;
    border: 1px solid #C8CCD3;
    background: #fff;
    vertical-align: text-bottom;
  }
  .empty {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
  }
  .empty p {
    font-size: 24px;
    color: #bfbfbf;
  }
  .contextMenu {
    border-right: none;
    border: 1px solid rgb(221, 222, 225);
    border-radius: 5px;
    box-shadow: 2px 2px 10px 2px rgb(221, 222, 225);
    position: absolute;
    left: 0px;
    top: 0px;
  }
  .vertical-center-modal {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .vertical-center-modal .ivu-modal{
    top: 0;
  }
  .shade {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1000;
    background-color: rgba(0,0,0,.80);
  }
  .img-header {
    width: 100%;
    height: 64px;
    background-color: #181818;
    font-size: 18px;
    color: #fff;
  }
  .img-header span {
    display: inline-block;
    height: 40px;
    line-height: 40px;
    margin: 12px 40px;
  }
  .img-header .img-close {
    float: right;
    margin: 0 40px;
    width: 64px;
    height: 64px;
    color: #fff;
    border: none;
    background-color: #181818;
  }
  .img-header .img-close:hover {
    background-color: rgba(255,255,255,.2);
  }
  .swiper-container {
    position: absolute;
    width: 70%;
    left: 50%;
    transform: translateX(-50%);
    top: 64px;
    bottom: 0px;
    background-color: #fff;
    margin: 0 auto;
  }
  .swiper-btn-prev, .swiper-btn-next {
    position: absolute;
    width: 60px;
    height: 60px;
    top: 50%;
    color: #fff;
    border: none;
    background-color: rgba(0,0,0,0);
  }
  .swiper-btn-prev:hover, .swiper-btn-next:hover {
    background-color: rgba(255,255,255,.2);
  }
  .swiper-btn-prev {
    left: 80px;
  }
  .swiper-btn-next {
    right: 80px;
  }
</style>
