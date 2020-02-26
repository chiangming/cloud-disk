<template>
  <div class="sider-bar-container">
    <div class="avater">
      <a class="logo" href="javascript:;">
        <img src="@/assets/images/cloud.png">
        <span>云盘</span>
      </a>
      <Search></Search>
      <div class="bottom-line"></div>
    </div>
    <Menu :active-name="type" class="sideBar" @on-select="selectHandle">
      <MenuItem name="time" style="font-size: 15px;font-weight: 500;" disabled>
        <Icon type="ios-time" style="font-size: 22px;margin: 0px 20px 0px 20px;"></Icon>
        最近
      </MenuItem>
      <div class="bottom-line"></div>
      <MenuItem name="folder" style="font-size: 15px;font-weight: 500;">
        <Icon type="md-document" style="font-size: 22px;margin: 0px 20px 0px 20px;"></Icon>
        全部
      </MenuItem>
      <MenuItem name="文档" style="font-size: 15px;font-weight: 500;">
        <Icon type="logo-buffer" style="font-size: 22px;margin: 0px 20px 0px 20px;"></Icon>
        文档
      </MenuItem>
      <MenuItem name="图片" style="font-size: 15px;font-weight: 500;">
        <Icon type="md-image" style="font-size: 22px;margin: 0px 20px 0px 20px;"></Icon>
        图片
      </MenuItem>
      <MenuItem name="视频" style="font-size: 15px;font-weight: 500;">
        <Icon type="ios-videocam" style="font-size: 22px;margin: 0px 20px 0px 20px;"></Icon>
        视频
      </MenuItem>
      <MenuItem name="音乐" style="font-size: 15px;font-weight: 500;">
        <Icon type="ios-musical-notes" style="font-size: 22px;margin: 0px 20px 0px 20px;"></Icon>
        音乐
      </MenuItem>
      <div class="bottom-line"></div>
      <MenuItem name="trash" style="font-size: 15px;font-weight: 500;" disabled>
        <Icon type="ios-trash" style="font-size: 22px;margin: 0px 20px 0px 20px;"></Icon>
        回收站
      </MenuItem>
      <MenuItem name="other" style="font-size: 15px;font-weight: 500;" disabled>
        <Icon type="ios-barcode" style="font-size: 22px;margin: 0px 20px 0px 20px;"></Icon>
        其他
      </MenuItem>
    </Menu>
    <div style="width: 80%;margin: 10px 0 40px 20px;font-weight: 500;color: #020202;">
      <p>已用：2G / 10G</p>
      <Progress :percent="20" hide-info></Progress>
    </div>
  </div>
</template>

<script>
import { Menu, MenuItem, Icon, Progress } from 'view-design'
import { mapState } from 'vuex'
import Search from '@/components/search'
import mixin from '@/store/mixin.js'
import axios from 'axios'

export default {
  mixins: [mixin],
  components: {
    Search,
    Menu,
    MenuItem,
    Icon,
    Progress
  },
  computed: {
    ...mapState([
      'type'
    ])
  },
  methods: {
    selectHandle (name) {
      // console.log(name)
      this.changeMenu({ type: name })
      this.changeCurrentListId({ id: 0 })
      this.changeCheckedAll({ checkAll: false })
      this.changeCurrentListBuffer()
    }
  },
  created () {
    axios({
      method: 'get',
      url: 'http://103.14.34.148:3030/data'
    }).then(response => {
      // console.log(response)
      if (response.status === 200 && response.data) {
        // console.log(response.data)
        // console.log(this)
        this.$store.commit('SET_DATA', { data: response.data })
        this.selectHandle('folder')
      }
    })
  }
}
</script>

<style>
.sider-bar-container {
  border-right: 1px solid #dddee1;
  display: flex;
  flex-direction: column;
  background: #f4f4f4;
  height: 100%;
  width: 240px;
  background: #f4f4f4;
}
.avater {
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  min-height: 200px;
}
.ivu-menu-light {
    background: #f5f7f9!important;
}
.ivu-progress-inner {
  background-color: #ffffff!important;
}
.logo {
  font-size: 20px;
  font-weight: bold;
  color: #000;
  line-height: 60px;
  margin-left: 20px;
}
.logo img {
  width: 74px;
  height: 46px;
  margin: 0 10px 0 5px;
  display: inline-block;
  box-sizing: border-box;
  vertical-align: middle
}
.logo span {
  height: 60px;
  font-size: 31px;
  margin: 0 10px 0 5px;
  font-weight: 400;
  display: inline-block;
  box-sizing: border-box;
  vertical-align: middle
}
.head {
  display: block;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  margin-left: 40px;
}
.bottom-line {
  width: 80%;
  height: 1px;
  background-color: #E8EAEB;
  margin-left: 20px;
}
.sideBar {
  width: 100%!important;
  display: flex;
  flex-direction: column;
  height: 100%;
  border-right: none;
  background: #f4f4f4;
  /* background-color: bisque; */
}
.menu-item {
  font-size: 15px;
}
.open-a {
  display: block;
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 36px;
    line-height: 36px;
    padding: 0 10px 0 34px;
    border-radius: 4px;
    color: #000;
    z-index: 4;
    border: 0 none;
    background: 0 0;
}

.ivu-menu-vertical.ivu-menu-light:after {
  content: '';
  display: block;
  width: 0;
  height: 100%;
  background: #dddee1;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
}
</style>
