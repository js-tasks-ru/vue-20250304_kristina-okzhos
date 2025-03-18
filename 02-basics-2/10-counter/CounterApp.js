import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CounterApp',

  setup() {
    const min = 0
    const max = 5

    const counter = ref(0)
    return {
      min,
      max,
      counter,
    }
  },

  template: `
    <div class="counter">
      <button
        class="button button--secondary"
        type="button"
        aria-label="Decrement"
        :disabled="counter <= min"
        @click="counter--"
      >➖</button>

      <span class="count" data-testid="count">{{counter}}</span>

      <button
        class="button button--secondary"
        type="button"
        aria-label="Increment"
        :disabled="counter >= max"
        @click="counter++"
      >➕</button>
    </div>
  `,
})
