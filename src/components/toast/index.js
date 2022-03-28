import ToastComponent from './index.vue'
import Vue from 'vue'

const ToastConstructor = Vue.extend(ToastComponent)

const types = ['primary', 'success', 'danger', 'warning', 'info', 'loading']

types.forEach(type => {
  Toast[type] = (message, duration, isMaskShow = false, position, onClose) => {
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

const positionStateInstance = {}

function getInstance(position) {
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

  if (position) {
    const instance = new ToastConstructor({
      propsData: {
        position,
      }
    })
    mounteInstance(instance)
    return positionStateInstance[positionKey] = instance
  }

  const instance = new ToastConstructor()
  mounteInstance(instance)
  return positionStateInstance[positionKey] = instance
}

function mounteInstance(instance) {
  const oODiv = document.createElement('div')

  document.body.appendChild(oODiv)
  instance.$mount(oODiv)
}

export function Toast ({ type, message, duration, isMaskShow = false, position, onClose }) {
  const instance = getInstance(position)

  return instance.add({ type, message, duration, isMaskShow, onClose })
}

export default Toast
