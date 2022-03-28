import { binarySearch } from '@/libs/util'

export function useVirtualList(ctx) {
  function addPosition(len) {
    const { listData,
            positionList,
            startIndex, } = ctx

    if (positionList.length === listData.length) {
      return
    }

    const addPositionList = initPosition(len, positionList.length)

    positionList.push(...addPositionList)
    setPositionList()
    ctx.isShowLoadTip = false
    startIndex != null && handleListIndexChange({ startIndex, scrollTop: 0 })
  }

  function setPositionList() {
    const { $refs, positionList, start, colHeight } = ctx
    const oItems = Array.from($refs.listRef.children)

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
    const { listData, abovePercentage, showCount, belowPercentage } = ctx
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
      end: startIndex + ctx.showCount + belowCount,
    }
  }

  function handleScrollEvent(e) {
    const { scrollTop } = e.target;

    setPositionList()

    const startIndex = binarySearch(ctx.positionList, scrollTop)

    if (startIndex > -1) {
      handleListIndexChange({ startIndex, scrollTop, e })
    }
  }

  function handleListIndexChange({ startIndex, scrollTop, e }) {
    const { throttleHandlePullupLoad,
            handleScroll,
            positionList, } = ctx
    const { start, end } = computedListIndex(startIndex)

    if (isScrollAttachedBottom(scrollTop)) {
      if (ctx.isShowLoadTip) {
        return
      }

      console.log('=== 上拉加载 ===')
      ctx.isShowLoadTip = true
      throttleHandlePullupLoad(e, startIndex ? startIndex - 1 : 0)
    }

    ctx.start = start
    ctx.end = end;
    ctx.startIndex = startIndex
    ctx.scrollTop = positionList[start].top
    e && handleScroll(e, startIndex ? startIndex - 1 : 0)
  }

  // 是否触底
  function isScrollAttachedBottom(scrollTop) {
    const { scrollHeight, clientHeight } = ctx.$refs?.wrapRef

    if (scrollTop + clientHeight + ctx.pullupLoadOffset >= scrollHeight) {
      return true
    }
  }

  function initPosition(length = 10, basicIndex = 0) {
    const { colHeight } = ctx

    return Array.from({ length }, (_, idx) => {
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
  }

  const init = () => {
    ctx.positionList = initPosition(ctx.listData.length)
    addPosition()
  }

  init()

  return {
    addPosition,
    initPosition,
    handleScrollEvent,
    setPositionList,
  }
}
