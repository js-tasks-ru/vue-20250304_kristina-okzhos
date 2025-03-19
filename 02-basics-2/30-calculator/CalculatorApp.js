import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'CalculatorApp',

  setup() {
    const operator = ref(null)
    const operandFirst = ref(0)
    const operandSecond = ref(0)

    const result = computed(() => {
      switch (operator.value) {
        case 'sum':
          return operandFirst.value + operandSecond.value
        case 'subtract':
          return operandFirst.value - operandSecond.value
        case 'multiply':
          return operandFirst.value * operandSecond.value
        case 'divide':
          return operandFirst.value / operandSecond.value
        default:
          return 0
      }
    })

    function formatterResult(result) {
      return +result.toFixed(2)
    }

    return {
      operator,
      result,
      operandFirst,
      operandSecond,
      formatterResult,
    }
  },

  template: `
    <div class="calculator">
      <input type="number" aria-label="First operand"  v-model:="operandFirst"/>

      <div class="calculator__operators">
        <label><input v-model="operator" type="radio" name="operator" value="sum"/>➕</label>
        <label><input v-model="operator"  type="radio" name="operator" value="subtract"/>➖</label>
        <label><input v-model="operator"  type="radio" name="operator" value="multiply"/>✖</label>
        <label><input v-model="operator"  type="radio" name="operator" value="divide"/>➗</label>
      </div>

      <input type="number" aria-label="Second operand" v-model:="operandSecond"/>

      <div>=</div>

      <output>{{formatterResult(result)}}</output>
    </div>
  `,
})
