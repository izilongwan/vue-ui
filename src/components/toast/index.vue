<template src="./index.html"></template>

<script>
export default {
  name: 'Toast',

  props: {
    position: [Object, null, undefined,],
  },

  data() {
    return {
      list: [],
      delay: 300,
    }
  },

  methods: {
    add ({ type = 'primary', message = 'message', duration = 2000, isMaskShow, onClose = () => {} }) {
      const item = {
        id: 'toast_' + Date.now() + '_' + String(Math.random()).slice(2),
        type,
        message,
        duration,
        isShow: true,
        isMaskShow,
        onClose,
      }

      this.list.push(item)

      const { id, duration: durationT } = item

      durationT > 0 && setTimeout(() => {
        this.hide(id)
      }, durationT)

      return () => this.hide(id)
    },

    hide(id) {
      let idx = this.findListIndex(id)
      this.list[idx].isShow = false

      setTimeout((id) => {
        idx = this.findListIndex(id)
        this.list[idx].onClose(id, idx);
        this.list.splice(idx, 1)
      }, this.delay, id)
    },

    findListIndex(id) {
      return this.list.findIndex((item) => {
        return item.id === id
      })
    }
  }
}
</script>

<style scoped src="./index.scss"></style>
