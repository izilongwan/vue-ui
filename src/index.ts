import '@/styles/index.scss'

import * as UI from './components'
import { formatComponentName, mediumHorizontalName } from './util';
export * from './components'

// 过滤掉非组件
const Components = Object.values(UI).filter(o => o.name)

// 单个组件添加install属性
;((Components) => {
  Components.forEach(component => {

    component.name = formatComponentName(component.name, 1)

    component.install = (Vue: TVueConfig) => {
      if (component.installed) {
        return
      }

      // 大驼峰组件命名
      Vue.component(component.name, component)
      // 中横线组件命名
      Vue.component(mediumHorizontalName(component.name), component)
      component.installed = true
    }
  })
})(Components);

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

const VUI = {
  ...UI,
  install: (Vue: TVueConfig) => install(Vue)
}

export default VUI
