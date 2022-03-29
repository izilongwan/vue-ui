export type TName = 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'loading'

export type INotify = {
  install(Vue: { extend: (arg0: any) => any }): void
  (config: INotifyConfig): Function;
} & {
  [K in TName]?: Function;
}

export interface INotifyConfig {
  type?: string
  title?: string
  message?: string
  duration?: number
  isMaskShow?: boolean
  position: Object
  onClose: Function
}
