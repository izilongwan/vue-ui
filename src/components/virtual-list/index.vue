<template src="./index.html"></template>

<script>
import { throttle } from '@/util'
import { useVirtualList } from './hook'

export default {
  name: 'VirtualList',

  props: {
    listData: {
      type: Array,
      default: () => []
    },
    colHeight: {
      type: Number,
      default: 50
    },
    showCount: {
      type: Number,
      default: 10
    },
    abovePercentage: {
      type: Number,
      default: 0.2
    },
    belowPercentage: {
      type: Number,
      default: 0.2
    },
    pullupLoadOffset: {
      type: Number,
      default: 40
    },
    isLoaded: {
      type: Boolean,
      default: false
    },
    handlePullupLoad: {
      type: Function,
      default: () => {}
    },
    handleScroll: {
      type: Function,
      default: () => {}
    },
    handleClick: {
      type: Function,
      default: () => {}
    },
  },

  data() {
    const { showCount } = this

    return {
      startIndex: 0,
      start: 0,
      end: showCount,
      scrollTop: 0,
      positionList: [],
      loadTip: '正在玩命加载...',
      isShowLoadTip: false,
    }
  },

  mounted() {
    const  {
      initPosition,
      addPosition,
      handleScrollEvent,
    } = useVirtualList(this)

    this.thorttleHandleScrollEvent = throttle(handleScrollEvent, 300)
    this.throttleHandlePullupLoad = throttle(this.handlePullupLoad, 300)

    this.addPosition = addPosition
    this.initPosition = initPosition
  },

  methods: {
    throttleHandlePullupLoad: () => {},

    thorttleHandleScrollEvent: () => {},

    watchListDataLengthChange(newVal, oldVal) {
      this.addPosition(newVal - oldVal)
    },

    watchDataLoadedChange(isLoaded)  {
      this.loadTip = isLoaded ? '我是有底线的人' : '正在玩命加载...'
    },
  },

  computed: {
    totalHeight() {
      const { positionList } = this

      if (positionList.length <= 0) {
        return 0
      }

      return positionList[positionList.length - 1].bottom
    },

    visibleListData() {
      const { start, end, listData } = this

      return Object.freeze(listData.slice(start, end))
    },
  },

  watch: {
    'listData.length': 'watchListDataLengthChange',
    isLoaded: 'watchDataLoadedChange',
  },

}
</script>

<style src="./index.scss" scoped></style>
