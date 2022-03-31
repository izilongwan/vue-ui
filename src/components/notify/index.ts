import Vue from 'vue'
import { VueConstructor } from 'vue/types/umd'
import NotifyComponent from './index.vue'
import { INotify, INotifyConfig, TName } from './typing'

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

export const Notify: INotify = ({ type, message, title, duration, position, onClose }: INotifyConfig) => {
  const instance = getInstance(position)

  return instance.add({ type, title, message, duration, onClose })
}

Notify.primary = function() {}
Notify.success = function() {}
Notify.danger = function() {}
Notify.warning = function() {}
Notify.info = function() {}

types.forEach(type => {
  Notify[type] = (message: string | INotifyConfig, duration: number, position: Object, onClose: Function, title: string) => {
    if (message && typeof message === 'object') {
      return Notify({ ...message, type })
    }

    return Notify({
      type,
      title,
      message,
      duration,
      position,
      onClose,
    })
  }
})

Notify.install = (Vue: { extend: (arg0: any) => any }) => {
  Ctr = Vue.extend(NotifyComponent)
}

export default Notify as Required<INotify>
