import ToastComponent from './index.vue'
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
    Ctr = Vue.extend(ToastComponent)
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

type IToast = {
  install(Vue: { extend: (arg0: any) => any }): void
  (config: IToastConfig): Function;
  // [K extends T ]?: Function
  // primary?: Function
  // success?: Function
  // danger?: Function
  // warning?: Function
  // info?: Function
  // loading?:Function
} & {
  [K in TName]?: Function;
}

const Toast: IToast = ({ type, message, duration, isMaskShow = false, position, onClose }: IToastConfig) => {
  const instance = getInstance(position)

  return instance.add({ type, message, duration, isMaskShow, onClose })
}

types.forEach(type => {
  Toast[type] = (message: string | IToastConfig, duration: number, isMaskShow = false, position: Object, onClose: Function) => {
    if (message && typeof message === 'object') {
      return Toast({ ...message, type })
    }

    return Toast({
      type,
      message,
      duration,
      isMaskShow,
      position,
      onClose,
    })
  }
})

Toast.install = (Vue: { extend: (arg0: any) => any }) => {
  Ctr = Vue.extend(ToastComponent)
}

interface IToastConfig {
  type?: string
  message?: string
  duration?: number
  isMaskShow?: boolean
  position: Object
  onClose: Function
}

export default Toast
