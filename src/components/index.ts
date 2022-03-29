import '@/styles/index.scss'

import VirtualList from './virtual-list'
import Loading from './loading'
import Notify from './notify'

const m = {
  VirtualList,
  Loading,
  Notify
}

const Components = Object.values(m)

Components.forEach(component => {
  component.install = (Vue: { component: (arg0: any, arg1: any) => void }) => {
    if (component.installed) {
      return
    }

    Vue.component(component.name, component)
    component.installed = true
  }
})

interface IInstall {
  (Vue: typeof import("vue/types/umd")): any
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

let GlobalVue = null;

if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}

if (GlobalVue) {
  install(GlobalVue)
}

export {
  VirtualList,
  Loading,
  Notify
}

export default m
