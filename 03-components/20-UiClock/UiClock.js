import { defineComponent, ref, onMounted, onUnmounted } from 'vue'

export default defineComponent({
  name: 'UiClock',

  setup() {
    const options = { timeStyle: 'medium' }
    const local = navigator.language
    const getTime = () => new Date().toLocaleTimeString(local, options)
    const time = ref(getTime())
    const updateTime = () => {
      time.value = getTime()
    }
    let intervalId
    onMounted(() => {
      intervalId = setInterval(updateTime, 1000)
    })
    onUnmounted(() => {
      clearInterval(intervalId)
    })
    return { time }
  },

  template: `<div class="clock">{{ time }}</div>`,
})
