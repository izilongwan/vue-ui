import { CombinedVueInstance } from 'vue/types/vue';

export interface ILoadingConfig {
  imgSrc?: string,
  message?: string
  duration?: number
  isMaskShow?: boolean
  position?: Object
  onClose?: Function
}

export interface ILoading {
  install(Vue: { extend: (arg0: any) => any }): void
  show(options?: ILoadingConfig): ILoadingRet;
}

export interface ILoadingRet {
  options: ILoadingConfig & { id: string }
  ctx: CombinedVueInstance<Vue, object, object, object, Record<never, any>>
  ref: HTMLElement
  close: Function
}
