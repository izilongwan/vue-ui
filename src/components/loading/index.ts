import LoadingComponent from './index.vue'
import Vue from 'vue'
import { VueConstructor } from 'vue/types/umd'
import { ILoading } from './typing'

let Ctr: VueConstructor

function getInstance(position: any): any {
  if (!Ctr) {
    Ctr = Vue.extend(LoadingComponent)
  }

  const instance = new Ctr()
  mounteInstance(instance)
  return instance
}

function mounteInstance(instance: { $mount: (arg0: HTMLDivElement) => void }) {
  const oODiv = document.createElement('div')

  document.body.appendChild(oODiv)
  instance.$mount(oODiv)
}

export const Loading: ILoading = {
  show({ message, imgSrc, duration, isMaskShow, position, onClose } = {}) {
    const instance = getInstance(position)

    return instance.show({ message, imgSrc, duration, isMaskShow, position, onClose })
  },

  install(Vue: { extend: (arg0: any) => any }) {
    Ctr = Vue.extend(LoadingComponent)
  }
}

export default Loading
