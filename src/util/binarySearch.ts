export function binarySearch(array: { bottom: number }[], target: number) {
  let leftIdx     = 0,
      rightIdx    = array.length - 1,
      middleIdx   = 0,
      templateIdx = -1,
      middleValue = 0

  while (leftIdx <= rightIdx) {
    middleIdx = Math.floor((leftIdx + rightIdx) / 2)
    middleValue = array[middleIdx].bottom

    if (middleValue === target) {
      return middleIdx
    }
    else if (middleValue < target) {
      leftIdx = middleIdx + 1
    }
    else {
      if (templateIdx === -1 || templateIdx > middleIdx) {
        templateIdx = middleIdx
      }
      rightIdx = middleIdx - 1
    }
  }

  return templateIdx
}
