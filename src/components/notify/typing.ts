export type TName = 'primary' | 'success' | 'danger' | 'warning' | 'info'

export type INotify = {
  install(Vue: { extend: (arg0: any) => any }): void
  show(config: INotifyConfig): { ref: HTMLElement, close: Function }
} & {
  [K in TName]: (...args: TNameConfig) => ({ ref: HTMLElement, close: Function })
}

export type TNameConfig = [message: string | INotifyConfig, title?: string, duration?: number, position?: Object, onClose?: Function]

export interface INotifyConfig {
  type?: string
  title?: string
  message: string
  duration?: number
  isMaskShow?: boolean
  position?: Object
  onClose?: Function
}
