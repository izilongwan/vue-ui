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
  show(config: ILoadingConfig): { ref: HTMLElement, close: Function };
}
