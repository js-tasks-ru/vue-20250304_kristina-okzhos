import { defineComponent } from 'vue'

export default defineComponent({
  name: 'WeatherAlert',

  props: {
    text: {
      type: String,
    },
  },

  template: `
    <div class="weather-alert">
      <slot name="alert">{{ text }}</slot>
    </div>
  `,
})
