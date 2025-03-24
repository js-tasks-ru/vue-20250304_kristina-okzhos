import { defineComponent, computed, toRef } from 'vue'
import WeatherDetailItem from './WeatherDetailItem.js'
import { WeatherConditionIcons } from './weather.service.ts'
export default defineComponent({
  name: 'WeatherConditions',

  components: {
    WeatherDetailItem,
  },

  props: {
    title: {
      type: String,
      required: true,
    },

    iconId: {
      type: Number,
      required: true,
    },

    temp: {
      type: Number,
      required: true,
    },
  },

  setup(props) {
    const temp = toRef(() => props.temp)

    const tempCelsius = computed(() => {
      /** Температура должна выводиться в градусах Цельсия с точностью до десятых (°C = °K – 273.15) */
      return (temp.value - 273.15).toFixed(1)
    })

    const icon = computed(() => {
      return WeatherConditionIcons[props.iconId]
    })

    return {
      tempCelsius,
      icon,
    }
  },

  template: `
    <div class="weather-conditions">
      <div 
        class="weather-conditions__icon" 
        :title="title"
      >
        {{icon}}
      </div>
      <div class="weather-conditions__temp">{{ tempCelsius }} °C</div>
    </div>
  `,
})
