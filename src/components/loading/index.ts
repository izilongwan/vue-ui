import LoadingComponent from './index.vue'
import Vue from 'vue'
import { VueConstructor } from 'vue/types/umd'
import { ILoading, ILoadingConfig } from './typing'

let Ctr: VueConstructor

function getInstance(options: ILoadingConfig): any {
  if (!Ctr) {
    Ctr = Vue.extend(LoadingComponent)
  }

  const instance = new Ctr({
    propsData: {
      options,
    }
  })
  mounteInstance(instance)
  return instance
}

function mounteInstance(instance: { $mount: (arg0: HTMLDivElement) => void }) {
  const oODiv = document.createElement('div')

  document.body.appendChild(oODiv)
  instance.$mount(oODiv)
}

export const Loading: ILoading = {
  show(options = {}) {
    const instance = getInstance(options)

    return instance.show(options)
  },

  install(Vue: { extend: (arg0: any) => any }) {
    Ctr = Vue.extend(LoadingComponent)
  },

  ...LoadingComponent,
}

export default Loading
