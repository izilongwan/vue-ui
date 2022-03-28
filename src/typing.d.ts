declare module '*.vue'

interface NodeModule {
  hot?: {
    accept: Function
  }
}
