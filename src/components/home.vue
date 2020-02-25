<template>
  <div style="display: flex;width: 100%; height: 100%;">
    <div style="height: 100%;">
      <side-bar/>
    </div>
    <div style="flex: 1; background: #fff; display: flex; flex-direction: column;">
      <tool-bar/>
      <Container>111</Container>
    </div>
  </div>
</template>

<script>
import ToolBar from '@/components/toolBar'
import SideBar from '@/components/sideBar'
import Container from '../components/container'
import mixin from '@/store/mixin.js'

export default {
  name: 'home',
  mixins: [mixin],
  components: {
    Container,
    ToolBar,
    SideBar
  },
  created () {
    this.changeCurrentListBuffer()
  }
}
</script>

<style>
.checkAll {
  color: #020202;
  text-align: left;
  width: 100%;
  height: 40px;
  line-height: 40px;
  padding-left: 20px;
  border-bottom: 1px solid rgb(230, 231, 236);
}
.content {
  height: 94vh;
  min-height: 650px;
}
</style>
