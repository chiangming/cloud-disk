<template>
  <div class="toolBar">
    <div>
      <Breadcrumb/>
    </div>
    <div class="btn-list">
          <Button  @click="changeViewTo('list')" class="btn-item" :class="view === 'list'? 'btn-active': ''" key="list">
            <img src="../assets/images/list.png" class="btn-img" />
          </Button>
          <Button  @click="changeViewTo('thumbnail')" class="btn-item" :class="view === 'thumbnail'? 'btn-active': ''" key="thumbnail">
            <img src="../assets/images/big.png" class="btn-img" />
          </Button>
    </div>
    <Modal
      v-model="modal1"
      title="删除文件"
      class-name="vertical-center-modal"
      @on-ok="okDelete"
      @on-cancel="cancelDelete">
      <p>确定删除这{{checkedBuffer.length}}个文件/文件夹？</p>
    </Modal>
    <Modal
      v-model="modal2"
      title="移动文件/文件夹到"
      class-name="vertical-center-modal"
      @on-ok="okMove"
      @on-cancel="cancelMove">
      <Tree :data="moveToData" style="color: #020202;" :render="renderContent"></Tree>
    </Modal>
  </div>
</template>

<script>
import { Button, Modal, Message, Tree } from 'view-design'
import Breadcrumb from './breadcrumb'
import { getChildrenById, canMoveData, getCheckedFileFromBuffer } from '../utils/utils.js'
import { mapState } from 'vuex'
import mixin from '@/store/mixin.js'
export default {
  name: 'toolbar',
  mixins: [mixin],
  components: {
    Button,
    Breadcrumb,
    Modal,
    Tree
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
    }),
    moveToData () {
      const data = this.$store.state.data
      const dataNew = []
      dataNew[0] = {
        title: data[0].name,
        id: 0,
        expand: true,
        children: []
      }
      function dataHandle (data, id) {
        const childrenData = getChildrenById(data, id)
        if (childrenData.length === 0) {
          if (data[id].type === 'zip') {
            return {
              title: data[id].name,
              disabled: true,
              id
            }
          }
          return {
            title: data[id].name,
            id
          }
        } else {
          const children = []
          for (let i = 0; i < childrenData.length; i++) {
            if (childrenData[i].type === 'folder' || childrenData[i].type === 'folder-f' || childrenData[i].type === 'folder-m') {
              children.push(dataHandle(data, childrenData[i].id))
            }
          }
          return {
            title: data[id].name,
            expand: true,
            id,
            children
          }
        }
      }
      for (const key in data) {
        if (data[key].pId === 0) {
          const item = data[key]
          // console.log(item)
          dataNew[0].children.push(dataHandle(data, item.id))
        }
      }

      // console.log(dataNew)
      return dataNew
    }
  },
  methods: {
    changeViewTo (view) {
      this.changeView({ view })
    },
    changeRankTo (rank) {
      this.changeRank({ rank })
    },
    renameStart () {
      this.$store.$emit('rename')
    },
    okDelete () {
      this.deleteDate()
      this.changeCheckedAll({ checkAll: false })
      this.changeCurrentListBuffer()
      Message.success('删除文件成功！')
    },
    cancelDelete () {
      Message.info('取消删除文件！')
    },
    okMove () {
      const data = getCheckedFileFromBuffer(this.checkedBuffer)
      let canMove = true
      for (let i = 0, len = data.length; i < len; i++) {
        const item = data[i]
        const ret = canMoveData(this.allData, item.id, this.activeId)
        if (ret === 2) {
          canMove = false
          return Message.error('已经在当前目录！')
        }
        if (ret === 3) {
          canMove = false
          return Message.error('不能移动到子文件夹中！')
        }
        if (ret === 4) {
          canMove = false
          return Message.error('存在同名文件！')
        }
        if (ret === 5) {
          canMove = false
          return Message.error('不能移动到压缩文件中！')
        }
      }
      if (canMove) {
        data.forEach((item, i) => {
          const { id } = item
          this.moveTarget({ id, targetId: this.activeId })
          this.changeCheckedAll({ checkAll: false })
          this.changeCurrentListBuffer()
        })
      }
      Message.success('移动文件成功！')
    },
    cancelMove () {
      this.active = 0
      Message.info('取消移动文件！')
    },
    renderContent (h, { root, node, data }) {
      return h('span', {
        style: {
          display: 'inline-block',
          width: '100%'
        }
      }, [
        h('span', {
          // class: 'activeTree',
          on: {
            click: () => { this.activeId = data.id }
          }
        }, [
          h('Icon', {
            props: {
              type: 'ios-folder',
              size: 18,
              color: this.activeId !== data.id ? '#2d8cf0' : '#19BE6B'
            },
            style: {
              marginRight: '8px'
            }
          }),
          h('span', data.title)
        ])
      ])
    }
  },
  mounted () {
    this.$store.$on('moveFolderTo', () => {
      this.modal2 = true
    })
    this.$store.$on('deleteFolder', () => {
      this.modal1 = true
    })
  }
}
</script>

<style>
.toolBar {
  display: flex;
  justify-content: space-between;
  height: 64px;
  line-height: 64px;
  padding:0 50px;
}
.btn-list {
  display: flex;
  justify-content: flex-end;
  align-items: center;
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
  margin-left: 20px;
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
