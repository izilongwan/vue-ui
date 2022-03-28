export function throttle(fn, delay) {
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

export function binarySearch(array, target) {
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
