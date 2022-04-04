/**
 *
 * @param str 组件名
 * @param type 0-中横线、1-大驼峰
 * @returns
 */
export function formatComponentName(str: string, type = 0) {
  if (type === 0) {
    return str.replace(/([A-Z])/g, (node, key, idx) => {
      const name = key.toLowerCase()

      return !idx ? `v-${ name }` : `-${ name }`
    })
  }

  return `V${ str }`
}

export function mediumHorizontalName(str: string) {
  let s = str.replace(/-([a-z])/g, (node, key) => {
    return key.toUpperCase()
  })

  s = s.replace(/([a-z])/, (node, key) => key.toUpperCase())

  console.log(s);

  return s
}
