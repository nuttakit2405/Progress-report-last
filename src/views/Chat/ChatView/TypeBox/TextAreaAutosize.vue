<template>
  <div>
    <textarea class="pd-l-15px typing" ref="typebox" id="text-chat" v-autosize="{maxHeight, minHeight}" placeholder="พิมพ์ข้อความ" @keydown.enter='sendMsg' v-model="input" rows="1" maxlength="640"></textarea>
  </div>
</template>

<script>
import autosize from 'autosize'
export default {
  props: {
    value: {
      type: String
    },
    send: {
      type: Function
    },
    maxHeight: {
      type: Number,
      default: 164
    },
    minHeight: {
      type: Number,
      default: 25
    }
  },
  directives: {
    autosize: {
      bind: function (el, data) {
        autosize(el)
        el.style.maxHeight = `${data.value.maxHeight}px`
        el.style.minHeight = `${data.value.minHeight}px`
      },
      componentUpdated: function (el, data) {
        el.style.maxHeight = `${data.value.maxHeight}px`
        el.style.minHeight = `${data.value.minHeight}px`
        autosize.update(el)
      },
      unbind: function (el) {
        autosize.destroy(el)
      }
    }
  },
  data () {
    return {
      input: this.value,
      defaultHeight: ''
    }
  },
  watch: {
    value (value) {
      this.input = this.value
    },
    input (value) {
      this.$emit('input', value)
    }
  },
  methods: {
    sendMsg (e) {
      const shifted = e.shiftKey
      if (!shifted) {
        e.preventDefault()
        const text = this.input + ''
        e.target.style.height = `${this.minHeight}px`
        this.send(text)
      }
    },
    focus () {
      this.$refs['typebox'].focus()
    }
  }
}
</script>

<style scoped>
  .typing {
    width: 100%;
    overflow-y: auto;
    flex-wrap: nowrap;
    resize: none;
    border: 0;
    font-size: 1rem;
    box-sizing: border-box;
  }
  .typing:focus {
    outline: none;
  }
</style>
