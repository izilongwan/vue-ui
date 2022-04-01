<template src="./index.html"></template>

<script>
import img from '@/assets/images/loading1.gif'

export default {
  name: 'Loading',

  props: {
    position: [Object, null, undefined],
  },

  data() {
    return {
      item: null,
      delay: 300,
      img,
    }
  },

  methods: {
    show ({ message = '', imgSrc = '', duration = 2000, isMaskShow = true, onClose = () => {} } = {}) {
      const item = {
        id: 'toast_' + Date.now() + '_' + String(Math.random()).slice(2),
        message,
        duration,
        isShow: true,
        isMaskShow,
        onClose,
      }

      imgSrc && (this.img = imgSrc)

      this.item = item

      duration > 0 && setTimeout(() => {
        this.hide()
      }, duration)

      const rs = {
        ref: this.$el,
        close: () => this.hide()
      }

      this.$nextTick(() => rs.ref = this.$el)

      return rs
    },

    hide() {
      this.item.isShow = false

      setTimeout(() => {
        this.item = null
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
