<template src="./index.html"></template>

</template>

<script>
export default {
  name: 'Confirm',

  props: {
    options: {
      type: Object,
      default: () => ({}),
    }
  },

  data() {
    return {
      vOptions: Object.assign(this.getDefaultOptions(), this.options),
      promise: null,
      resolve: null,
      reject: null,
    }
  },

  methods: {
    getDefaultOptions() {
      return {
        id: 'confirm_' + Date.now() + String(Math.random()).slice(-4),
        title: '提示',
        content: '是否继续执行此操作?',
        leftText: '确 定',
        rightText: '取 消',
        isShow: true,
        isMaskShow: true,
        autoClose: true,
      }
    },

    show() {
      this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })

      return this.promise
    },

    hide() {
      this.vOptions.isShow = false

      setTimeout(() => {
        this.vOptions = null
        this.$nextTick(() => {
          this.$destroy()
          this?.$el?.remove()
        })
      }, 500);
    },

    handleClick(e) {
      const tar = e.target
      const { field } = tar.dataset

      if (!field) {
        return
      }

      const result = {
        ctx: this,
        ref: this?.$el,
        options: this.vOptions,
        close: () => this.hide()
      }

      const rs = [
        field == 1 ? true : false,
        result,
      ]

      this.resolve(rs)
      this.vOptions?.autoClose && this.hide()
    }
  }
}
</script>

<style src="./index.scss" scoped></style>
