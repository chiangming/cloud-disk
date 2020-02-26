<template>
  <div class="modNav">
    <Button style="background-color: #2980ff;border: 1px solid #2980ff;color: #fff;border-radius: 2px;" type="primary" icon="plus-round" size="large" @click="upload" ><Icon type="md-cloud-upload" size=20 /> &nbsp;上传</Button>
    <Button style="background-color: #fff;border: 1px solid #2980ff;color: black;border-radius: 2px;margin-left:20px" type="primary" icon="plus-round" size="large" @click="addFolder" ><Icon type="md-add" size=20 />&nbsp;新建</Button>
  </div>
</template>

<script>
import { Button, Icon } from 'view-design'
import { mapState } from 'vuex'
import mixin from '@/store/mixin.js'
export default {
  name: 'toolbar',
  mixins: [mixin],
  components: {
    Button,
    Icon
  },
  data () {
    return {
      active: false,
      newName: '',
      modal1: false,
      modal2: false,
      activeId: 0
    }
  },
  computed: {
    ...mapState({
      view: 'view',
      rank: 'rank',
      checkedBuffer: 'checkedBuffer',
      allData: 'data',
      type: 'type'
    })
  },
  methods: {
    addFolder () {
      this.$store.$emit('addNewFolderHandle')
    },
    upload () {
      this.$store.commit('SHOW_UPLOAD', { upload: !this.$store.state.showUpload })
    }

  },
  mounted () {
  }
}
</script>

<style>
.modNav {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 64px;
  line-height: 64px;
  padding-left: 50px;
}
.btn-list {
  display: flex;
  justify-content: flex-end;
  padding: 13px 45px 14px 0;
}
.btn-grounp {
  margin-right: 20px;
  vertical-align: top !important;
}
.btn-img {
  width: 16px;
  margin-bottom: -2px;
}
.btn-active {
  background-color: #E6E7EC !important;
  pointer-events: none;
}
.activeTree {
  background-color: antiquewhite;
}
.btn-item {
  font-weight: 500;
}
.vertical-center-modal {
  display: flex;
  justify-content: center;
  align-items: center;
}
.vertical-center-modal .ivu-modal{
  top: 0;
}
</style>
