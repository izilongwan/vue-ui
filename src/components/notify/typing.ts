import { CombinedVueInstance } from 'vue/types/vue'

export type TName =
  | 'primary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'

export type INotify = {
  install(Vue: { extend: (arg0: any) => any }): void
  show(options: INotifyConfig): INotifyRet
} & {
  [K in TName]: (options: INotifyConfig) => INotifyRet
}

export interface INotifyRet {
  options: INotifyConfig & { id: string }
  ctx: CombinedVueInstance<Vue, object, object, object, Record<never, any>>
  ref: HTMLElement
  close: Function
}

// export type TNameConfig = [message: string | INotifyConfig, title?: string, duration?: number, position?: Object, onClose?: Function]

export interface INotifyConfig {
  type?: TName
  title?: string
  message: string
  duration?: number
  isMaskShow?: boolean
  position?: Record<string, any>
  onClose?: Function
}
