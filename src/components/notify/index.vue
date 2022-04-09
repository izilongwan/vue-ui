<template src="./index.html"></template>

<script>
export default {
  name: 'Notify',

  props: {
    myStyle: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      listMap: {},
      list: [],
      delay: 300,
    }
  },

  methods: {
    getDefaultOptions() {
      return {
        id: 'notify_' + Date.now() + '_' + String(Math.random()).slice(2),
        type: 'primary',
        title: 'Notify',
        content: '',
        duration: 2000,
        isShow: true,
        isShowAnimate: false,
      }
    },

    add (options = {}) {
      const defaultOptions = Object.assign(this.getDefaultOptions(), options)
      const { id, duration } = defaultOptions

      this.listMap[id] = defaultOptions
      this.list.push(defaultOptions)

      duration > 0 && setTimeout(() => {
        this.hide(id)
      }, duration)

      const rs = {
        ctx: this,
        options: defaultOptions,
        ref: null,
        close: () => this.hide(id)
      }

      this.$nextTick(() => {
        const idx = this.findListIndex(id)
        rs.ref = this.$refs.ref?.[idx]
      })

      return rs
    },

    hide(id) {
      this.listMap[id].isShow = false

      setTimeout((id) => {
        const idx = this.findListIndex(id)
        this.listMap?.[id]?.onClose?.(id, idx)
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
