import LoadingComponent from './index.vue'
import Vue from 'vue'
import { VueConstructor } from 'vue/types/umd'

let Ctr: VueConstructor

function getInstance(position: any): any {
  let positionKey = 'center'

  try {
    positionKey = JSON.stringify(position)
  } catch (error) {

  } finally {
    !positionKey && (positionKey = 'center')
  }

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

type ILoading = {
  install(Vue: { extend: (arg0: any) => any }): void
  (config: ILoadingConfig): Function;
}
const Loading: ILoading = ({ message, duration, isMaskShow = true, position, onClose }: ILoadingConfig) => {
  const instance = getInstance(position)

  return instance.show({ message, duration, isMaskShow, position, onClose })
}

Loading.install = (Vue: { extend: (arg0: any) => any }) => {
  Ctr = Vue.extend(LoadingComponent)
}

interface ILoadingConfig {
  message?: string
  duration?: number
  isMaskShow?: boolean
  position: Object
  onClose: Function
}

export default Loading
