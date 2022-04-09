import LoadingComponent from './index.vue'
import Vue from 'vue'
import { VueConstructor } from 'vue/types/umd'
import { ILoading, ILoadingConfig } from './typing'
import { TInstance } from '@/types'

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

  mounteInstance(instance, options)

  return instance
}

function mounteInstance(instance: TInstance, options: ILoadingConfig) {
  const oODiv = document.createElement('div');

  (options.body ?? document.body).appendChild(oODiv)
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
