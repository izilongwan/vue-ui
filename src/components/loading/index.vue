<template src="./index.html"></template>

<script>
import imgSrc from '@/assets/images/loading1.gif'

export default {
  name: 'Loading',

  props: {
    options: {
      type: [Object, null],
      default: () => null
    },
  },

  data() {
    return {
      vOptions: Object.assign(this.getDefaultOptions(), this.options),
      delay: 300,
    }
  },

  methods: {
    getDefaultOptions() {
      return {
        id: 'loading_' + Date.now() + '_' + String(Math.random()).slice(2),
        message: '',
        duration: 2000,
        isShow: true,
        isMaskShow: true,
        imgSrc,
      }
    },

    show (options = {}) {
      this.vOptions = Object.assign(this.getDefaultOptions(), options)
      const { duration } = this.vOptions

      duration > 0 && setTimeout(() => {
        this.hide()
      }, duration)

      const rs = {
        options: this.vOptions,
        ctx: this,
        ref: this.$el,
        close: () => this.hide()
      }

      this.$nextTick(() => rs.ref = this.$el)

      return rs
    },

    hide() {
      this.vOptions.isShow = false

      setTimeout(() => {
        this.vOptions.onClose?.()
        this.vOptions = null
        this.$nextTick(() => {
          this.$destroy()
          this.$refs?.ref?.remove()
        })
      }, this.delay)
    }
  }
}
</script>

<style scoped src="./index.scss"></style>
