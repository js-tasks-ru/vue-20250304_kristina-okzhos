import { defineComponent, computed } from 'vue'
import { UiButton } from '@shgk/vue-course-ui'
import './UiCounter.css'

export default defineComponent({
  name: 'UiCounter',

  components: {
    UiButton,
  },

  props: {
    count: {
      type: Number,
      default: 0,
      required: false,
    },

    min: {
      type: Number,
      default: 0,
      required: false,
    },

    max: {
      type: Number,
      default: Infinity,
      required: false,
    },
  },

  emits: ['update:count'],
  setup(props) {
    // Рекомендуется для практики реализовать обработку событий внутри setup, а не непосредственно в шаблоне

    function countDecrement() {
      this.$emit('update:count', props.count - 1)
    }

    const disabledDecrement = computed(() => {
      return props.count <= props.min
    })

    function countIncrement() {
      this.$emit('update:count', props.count + 1)
    }

    const disabledIncrement = computed(() => {
      return props.count >= props.max
    })

    return {
      countDecrement,
      disabledDecrement,
      countIncrement,
      disabledIncrement,
    }
  },

  template: `
    <div class="counter">
      <UiButton aria-label="Decrement" :disabled="disabledDecrement" @click="countDecrement()">➖</UiButton>
      <span class="count" data-testid="count">{{count}}</span>
      <UiButton aria-label="Increment" :disabled="disabledIncrement" @click="countIncrement()">➕</UiButton>
    </div>
  `,
})
