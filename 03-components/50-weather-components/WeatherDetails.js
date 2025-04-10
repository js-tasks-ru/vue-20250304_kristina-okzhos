import { defineComponent, computed, toRef } from 'vue'
import WeatherDetailItem from './WeatherDetailItem.js'

export default defineComponent({
  name: 'WeatherDetails',

  components: {
    WeatherDetailItem,
  },

  props: {
    weatherCurrent: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const weatherCurrent = toRef(() => props.weatherCurrent)

    const pressure = computed(() => {
      return +(weatherCurrent.value.pressure * 0.75).toFixed(0)
    })

    return {
      pressure,
    }
  },

  template: `
    <div class="weather-details">
      <WeatherDetailItem :label="'Давление, мм рт. ст.'" :value="pressure"/>
      <WeatherDetailItem :label="'Влажность, %'" :value="weatherCurrent.humidity"/>
      <WeatherDetailItem :label="'Облачность, %'" :value="weatherCurrent.clouds"/>
      <WeatherDetailItem :label="'Ветер, м'" :value="weatherCurrent.wind_speed"/>
    </div>
  `,
})
