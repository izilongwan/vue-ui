<template src="./index.html"></template>

<script>
export default {
  name: 'Notify',

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
    add ({ type = 'primary', title = 'Notify', message = 'message', duration = 2000, onClose = () => {} }) {
      const item = {
        id: 'notify_' + Date.now() + '_' + String(Math.random()).slice(2),
        type,
        title,
        message,
        duration,
        isShow: true,
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
