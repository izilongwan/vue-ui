import Vue from 'vue'
import { VueConstructor } from 'vue/types/umd'
import NotifyComponent from './index.vue'
import { INotify, TName } from './typing'

const positionStateInstance: {
  [key: string]: any
} = {}

let Ctr: VueConstructor

function getInstance(position: any) {
  let positionKey = 'center'

  try {
    positionKey = JSON.stringify(position)
  } catch (error) {

  } finally {
    !positionKey && (positionKey = 'center')
  }

  if (positionStateInstance[positionKey]) {
    return positionStateInstance[positionKey]
  }

  if (!Ctr) {
    Ctr = Vue.extend(NotifyComponent)
  }

  if (position) {
    const instance = new Ctr({
      propsData: {
        position,
      }
    })
    mounteInstance(instance)
    return positionStateInstance[positionKey] = instance
  }

  const instance = new Ctr()
  mounteInstance(instance)
  return positionStateInstance[positionKey] = instance
}

function mounteInstance(instance: { $mount: (arg0: HTMLDivElement) => void }) {
  const oODiv = document.createElement('div')

  document.body.appendChild(oODiv)
  instance.$mount(oODiv)
}

const types: TName[] = ['primary', 'success', 'danger', 'warning', 'info']

export const Notify: INotify = {
  show({ type, message, title, duration, position, onClose }) {
    const instance = getInstance(position)

    return instance.add({ type, title, message, duration, onClose })
  },

  install(Vue: { extend: (arg0: any) => any }) {
    Ctr = Vue.extend(NotifyComponent)
  },

  primary(config): any { },
  success(config): any { },
  danger(config): any { },
  warning(config): any { },
  info(config): any { },
  ...NotifyComponent,
}

types.forEach(type => {
  Notify[type] = (config) => {
    Object.assign(config, { type })

    return Notify.show(config)
  }
})

export default Notify
