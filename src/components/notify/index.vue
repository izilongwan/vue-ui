<template src="./index.html"></template>

<script>
export default {
  name: 'Notify',

  props: {
    position: [Object, null, undefined,],
  },

  data() {
    return {
      listMap: {},
      list: [],
      delay: 300,
    }
  },

  methods: {
    add ({ type = 'primary', title = 'Notify', message = '', duration = 2000, onClose = () => {} }) {
      const id = 'notify_' + Date.now() + '_' + String(Math.random()).slice(2)

      const item = {
        id,
        type,
        title,
        message,
        duration,
        isShow: true,
        onClose,
      }

      this.listMap[id] = item
      this.list.push(item)

      duration > 0 && setTimeout(() => {
        this.hide(id)
      }, duration)

      return {
        ref: null,
        close: () => this.hide(id)
      }
    },

    hide(id) {
      this.listMap[id].isShow = false

      setTimeout((id) => {
        const idx = this.findListIndex(id)
        this.listMap?.[id]?.onClose(id, idx)
        idx >= 0 && this.list.splice(idx, 1)
        delete this.listMap?.[id]
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
