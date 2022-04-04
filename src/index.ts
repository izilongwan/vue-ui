import '@/styles/index.scss'
import { PluginFunction, PluginObject, VueConstructor } from 'vue';

import * as UI from './components'
import { formatComponentName } from './util';
export * from './components'

type TVueComponent = VueConstructor<Vue> & {
  installed?: boolean,
  install(Vue: TVue): void
}

// 过滤掉非组件
const Components = <TVueComponent[]> Object.values(UI).filter(o => o.name)

  // 单个组件添加install方法
  ; ((Components) => {
    Components.forEach(component => {

      // component.name = formatComponentName(component.name, 1)

      component.install = (Vue) => {
        if (component.installed) {
          return
        }

        registerComponent(Vue, component)
        component.installed = true
      }
    })
  })(Components);

function registerComponent(Vue: TVue, component: VueConstructor) {
  // 大驼峰组件命名
  Vue.component(formatComponentName(component.name, 1), component)
  // 中横线组件命名
  Vue.component(formatComponentName(component.name, 0), component)
}

export function autoGlobalRegister() {
  let GlobalVue = null;

  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }

  if (GlobalVue) {
    install(GlobalVue)
  }
}

export type TVue = typeof import("vue/types/umd")

export type TInstall<T = any> = PluginFunction<T> & {
  installed?: boolean
}

export const install: TInstall = (Vue) => {
  if (install.installed) {
    return
  }

  install.installed = true;

  Components.forEach(component => {
    registerComponent(<any> Vue, component)
  })
}

const VUI: PluginObject<any> = {
  ...UI,
  install,
}

export default VUI
