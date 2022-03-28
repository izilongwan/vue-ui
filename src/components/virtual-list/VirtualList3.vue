<template>
  <div class="virtual-list-wrap" ref="wrapRef" @scroll="thorttleHandleScrollEvent">
    <div class="virtual-list-scroll-bar" :style="{ height: totalHeight + 'px' }"></div>

    <div class="virtual-list-scroll-content" :style="{ transform: 'translateY(' + scrollTop + 'px)'}">
      <ul class="virtual-list" ref="listRef" @click="handleClick">
        <slot
          name="default"
          :position-list="positionList"
          :visible-list-data="visibleListData"
          :virtual-idx="start"></slot>
      </ul>

      <p :class="['virtual-list-load-tip', isShowLoadTip ? 'show' : '']">{{ loadTip }}</p>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from '@vue/reactivity'
import { computed, onMounted, watch, watchEffect } from '@vue/runtime-core'

export default {
  name: 'VirtualList3',
  setup(ctx, props) {
    const { listData = [],
            listHeight = 400,
            showCount = 10,
            colHeight = 50,
            abovePercentage = 0.2,
            belowPercentage = 0.2,
            pullupLoadOffset = 40,
            isLoaded = false,
            handlePullupLoad = () => {},
            handleClick = () => {},
            handleScroll = () => {}} = props.attrs

    const data = {
      startIndex: 0,
      start: 0,
      end: showCount,
      scrollTop: 0,
      positionList: initPosition(listData.length),
      loadTip: '正在玩命加载...',
      isShowLoadTip: false,
    }

    const state = reactive(data)
    const listRef = ref()
    const wrapRef = ref()

    const totalHeight = computed(() => {
      const { positionList } = state

      if (positionList.length <= 0) {
        return listHeight
      }

      return positionList[positionList.length - 1].bottom
    });
    const visibleListData = computed(() => Object.preventExtensions(listData.slice(state.start, state.end)))

    onMounted(() => {
      setPositionList()
    })

    watch([() => listData.length], ([newVal], [oldVal]) => {
      addPosition(newVal - oldVal)
    })

    watchEffect(() => {
      state.loadTip = isLoaded ? '我是有底线的人' : '正在玩命加载...'
    }, isLoaded)

    function initPosition(length = 10, basicIndex = 0) {
      const positionList = Array.from({ length }, (_, idx) => {
        return {
          top: (basicIndex + idx)
            ? (basicIndex + idx) * colHeight
            : 0,
          bottom: (basicIndex + idx)
            ? (basicIndex + idx + 1) * colHeight
            : colHeight,
          height: colHeight,
          marginTop: 0,
          marginBottom: 0,
        }
      }) || []

      return positionList
    }

    function addPosition(len) {
      // console.log('🚀 ~ file: VirtualList.vue ~ line 76 ~ addPosition ~ len', len, state.positionList.length, listData.length)
      if (state.positionList.length === listData.length) {
        return
      }

      const positionList = initPosition(len, state.positionList.length)

      state.positionList.push(...positionList)
      setPositionList()
      handleListIndexChange({ startIndex: state.startIndex, scrollTop: 0 })
      state.isShowLoadTip && (state.isShowLoadTip = false)
    }

    function setPositionList() {
      const oItems = Array.from(listRef?.value?.children || []),
            { positionList, start } = state

      oItems.forEach((oItem, i) => {
        const { height } = oItem.getBoundingClientRect(),
              idx = start + i

        if (height - positionList[idx]?.height === 0) {
          return
        }

        const { marginTop, marginBottom } = window.getComputedStyle(oItem),
              mT = parseInt(marginTop),
              mB = parseInt(marginBottom)

        const { bottom: prevBottom = idx * colHeight } = positionList[idx - 1] || {}

        const pos = {
          height: height + mT + mB,
          top: idx
            ? prevBottom
            : 0,
          bottom: idx
            ? height + prevBottom + mT + mB
            : height + mT + mB,
          marginTop: mT,
          marginBottom: mB,
        }

        positionList[idx] = pos

        positionList.forEach((pos, i, _) => {
          if (i > idx) {
            pos.top = _[i - 1].bottom
            pos.bottom = pos.top + pos.height
          }
        })
      })
    }

    function computedAboveBelowCount(startIndex) {
      const { floor, min } = Math

      return {
        aboveCount: min(startIndex, floor(abovePercentage * showCount)),
        belowCount: min(listData.length - startIndex - showCount, floor(belowPercentage * showCount))
      }
    }

    function computedListIndex(startIndex) {
      const { aboveCount, belowCount } = computedAboveBelowCount(startIndex)

      return {
        start: startIndex - aboveCount,
        end: startIndex + showCount + belowCount,
      }
    }

    function handleScrollEvent(e) {
      const { scrollTop } = e.target;

      setPositionList()

      const startIndex = binarySearch(state.positionList, scrollTop)

      if (startIndex > -1) {
        handleListIndexChange({ startIndex, scrollTop, e })
      }
    }

    function handleListIndexChange({ startIndex, scrollTop, e }) {
      const { start, end } = computedListIndex(startIndex)

      if (isScrollAttachedBottom(scrollTop)) {
        console.log('===')
        state.isShowLoadTip = true
        throttleHandlePullupLoad(e, startIndex ? startIndex - 1 : 0)
      }

      state.start = start
      state.end = end;
      state.startIndex = startIndex
      state.scrollTop = state.positionList[start].top
      e && handleScroll(e, startIndex ? startIndex - 1 : 0)
    }

    function throttle(fn, delay) {
      let fTs = Date.now(),
          t = null

      return function(...args) {
        clearTimeout(t)

        if (Date.now() - fTs > delay) {
          fTs = Date.now()
          return fn.apply(this, args)
        }

        t = setTimeout(() => {
          fn.apply(this, args)
        }, delay);
      }
    }

    function binarySearch(array, target) {
      let leftIdx     = 0,
          rightIdx    = array.length - 1,
          middleIdx   = 0,
          templateIdx = null,
          middleValue = 0

      while (leftIdx <= rightIdx) {
        middleIdx = parseInt((leftIdx + rightIdx) / 2)
        middleValue = array[middleIdx].bottom

        if (middleValue === target) {
          return middleIdx
        }
        else if (middleValue < target) {
          leftIdx = middleIdx + 1
        }
        else {
          if (templateIdx === null || templateIdx > middleIdx) {
            templateIdx = middleIdx
          }
          rightIdx = middleIdx - 1
        }
      }

      return templateIdx
    }

    // 是否触底
    function isScrollAttachedBottom(scrollTop) {
      const { scrollHeight, clientHeight } = wrapRef?.value

      if (scrollTop + clientHeight + pullupLoadOffset >= scrollHeight) {
        return true
      }
    }

    const throttleHandlePullupLoad = throttle(handlePullupLoad, 300)
    const thorttleHandleScrollEvent = throttle(handleScrollEvent, 300)

    return {
      wrapRef,
      listRef,
      totalHeight,
      visibleListData,
      thorttleHandleScrollEvent,
      handleClick,
      handleScroll,
      ...toRefs(state),
    };
  }
}
</script>

<style lang="scss" scoped>
.virtual-list-wrap {
  position: relative;
  height: 400px;
  overflow: scroll;

  .virtual-list {
    list-style: none;
    margin: 0;
  }

  .virtual-list-scroll-bar {
    position: absolute;
    top: 0;
    right: 10px;
    width: 10px;
  }

  .virtual-list-scroll-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;

    .virtual-list-load-tip {
      line-height: 20px;
      font-size: 12px;
      color: #999;
      text-align: center;
      opacity: 0;

      &.show {
        opacity: 1;
        transition: opacity 0.3s;
      }
    }
  }
}
</style>
