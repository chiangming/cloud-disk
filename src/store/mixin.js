import { mapGetters, mapActions, mapState } from 'vuex'

const mixin = {
  data () {
    return {}
  },
  computed: {
    ...mapGetters([]),
    ...mapState([
      'type'
    ])
  },
  methods: {
    ...mapActions([
      'changeMenu',
      'changeCurrentListId',
      'changeChecked',
      'changeCheckedAll',
      'changeCurrentListBuffer',
      'changeData',
      'changeView',
      'changeRank',
      'changeEdit',
      'changeName',
      'deleteDate',
      'addNewFolder',
      'moveTarget'
    ])
  }
}

export default mixin
