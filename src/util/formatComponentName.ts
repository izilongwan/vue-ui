/**
 *
 * @param str 组件名
 * @param type 0-中横线、1-大驼峰
 * @returns
 */
export function formatComponentName(str: string, type = 0) {
  if (type === 0) {
    const s = str.replace(/([A-z])/, (node, key) => {
      if (key === key.toUpperCase()) {
        return `-${ key.toLowerCase() }`
      }

      return key
    })

    return `v-${ s }`.replace(/--/, '-')
  }

  return `V${ str }`
}
