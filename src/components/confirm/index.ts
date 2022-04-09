import ConfirmComponent from './index.vue'
import Vue, { VueConstructor } from 'vue'
import { IConfirmOptions } from './typing'
import { TInstance } from '@/types'

let Ctr: VueConstructor

function getInstance(options: IConfirmOptions) {
  if (!Ctr) {
    Ctr = Vue.extend(ConfirmComponent)
  }

  const instance = new Ctr({
    propsData: {
      options,
    }
  }) as TInstance & { show(): Promise<[boolean, Record<string, any>]> }

  mounteInstance(instance)

  return instance
}

function mounteInstance(instance: TInstance) {
  const oODiv = document.createElement('div');

  document.body.appendChild(oODiv)
  instance.$mount(oODiv)
}

export default (options: IConfirmOptions) => {
  return getInstance(options).show()
}
