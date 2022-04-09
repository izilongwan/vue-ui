import { CombinedVueInstance } from 'vue/types/vue'

export type TName =
  | 'primary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'

export type INotify = {
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
  content: string
  duration?: number
  isMaskShow?: boolean
  style?: Record<string, any>
  onClose?: Function
}
