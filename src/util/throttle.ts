export const throttle = (fn: Function, delay: number) => {
  let fTs = Date.now(),
      t: NodeJS.Timeout

  return function(this: Object, ...args: any[]) {
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
