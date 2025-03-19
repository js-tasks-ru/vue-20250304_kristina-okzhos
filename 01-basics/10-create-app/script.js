import { defineComponent, createApp } from 'vue'

const AppToday = defineComponent({
  name: 'AppToday',

  setup() {
    const currentDate = new Date()
    const dateOptions = {
      dateStyle: 'long',
    }
    const dateLocal = navigator.language ?? 'ru-RU'
    const formattedDate = currentDate.toLocaleDateString(dateLocal, dateOptions)

    return {
      formattedDate,
    }
  },

  template: `Сегодня {{ formattedDate }}`,
})

const app = createApp(AppToday)
app.mount('#app')
