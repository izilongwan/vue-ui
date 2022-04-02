import '@/styles/index.scss'

import * as UI from './components'
import { formatComponentName } from './util';
export * from './components'

const Components = Object.values(UI)

// 单个组件添加install属性
function componentInstall() {
  Components.forEach(component => {
    component.install = (Vue: TVueConfig) => {
      if (component.installed || !component.name) {
        return
      }

      // 中横线组件命名
      Vue.component(formatComponentName(component.name), component)
      // 大驼峰组件命名
      Vue.component(formatComponentName(component.name, 1), component)
      component.installed = true
    }
  })
}

componentInstall()

export type TVueConfig = typeof import("vue/types/umd")

export interface IInstall {
  (V: TVueConfig): any
  installed?: boolean
}

export const install: IInstall = (Vue) => {
  if (install.installed) {
    return
  }

	install.installed = true;

  Components.forEach(component => {

    if (!component.name) {
      return
    }

    Vue.component(component.name, component)
  })
}

// let GlobalVue = null;

// if (typeof window !== 'undefined') {
//   GlobalVue = window.Vue;
// } else if (typeof global !== 'undefined') {
//   GlobalVue = global.Vue;
// }

// if (GlobalVue) {
//   install(GlobalVue)
// }

const _UI = {
  ...UI,
  install: (Vue: TVueConfig) => install(Vue)
}

export default _UI
