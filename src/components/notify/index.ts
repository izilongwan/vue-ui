import { TInstance } from '@/types'
import Vue from 'vue'
import { VueConstructor } from 'vue/types/umd'
import NotifyComponent from './index.vue'
import { INotify, TName } from './typing'

const positionStateInstance: {
  [key: string]: any
} = {}

let Ctr: VueConstructor

function getInstance(myStyle: Record<string, any>) {
  let positionKey = 'default'

  try {
    positionKey = JSON.stringify(myStyle)
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

  if (myStyle) {
    const instance = new Ctr({
      propsData: {
        myStyle,
      }
    })

    mounteInstance(instance)

    return positionStateInstance[positionKey] = instance
  }

  const instance = new Ctr()
  mounteInstance(instance)
  return positionStateInstance[positionKey] = instance
}

function mounteInstance(instance: TInstance) {
  const oODiv = document.createElement('div')

  document.body.appendChild(oODiv)
  instance.$mount(oODiv)
}

const types: TName[] = ['primary', 'success', 'danger', 'warning', 'info']

export const Notify: INotify = {
  show(options) {
    const instance = getInstance(options.style!)

    return instance.add(options)
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
