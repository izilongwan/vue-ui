export type TName = 'primary' | 'success' | 'danger' | 'warning' | 'info'

export type INotify = {
  install(Vue: { extend: (arg0: any) => any }): void
  (config: INotifyConfig): Function;
} & {
  [K in TName]: (...args: TNameConfig) => any
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
