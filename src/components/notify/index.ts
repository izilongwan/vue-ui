import NotifyComponent from './index.vue'
import Vue from 'vue'
import { VueConstructor } from 'vue/types/umd'

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

type TName = 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'loading'
const types: TName[] = ['primary', 'success', 'danger', 'warning', 'info', 'loading']

type INotify = {
  install(Vue: { extend: (arg0: any) => any }): void
  (config: INotifyConfig): Function;
} & {
  [K in TName]?: Function;
}

const Notify: INotify = ({ type, message, title, duration, position, onClose }: INotifyConfig) => {
  const instance = getInstance(position)

  return instance.add({ type, title, message, duration, onClose })
}

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

interface INotifyConfig {
  type?: string
  title?: string
  message?: string
  duration?: number
  isMaskShow?: boolean
  position: Object
  onClose: Function
}

export default Notify
