import { defineComponent } from 'vue'
import { getWeatherData } from './weather.service.ts'
import './WeatherApp.css'

import WeatherAlert from './WeatherAlert.js'
import WeatherDetails from './WeatherDetails.js'
import WeatherConditions from './WeatherConditions.js'

export default defineComponent({
  name: 'WeatherApp',

  components: {
    WeatherAlert,
    WeatherDetails,
    WeatherConditions,
  },

  setup() {
    const weatherList = getWeatherData()

    function checkNight(current) {
      /** Если в месте прогноза ночь (солнце не встало или уже зашло), карточка должна быть тёмной */
      return current.dt < current.sunrise && current.dt < current.sunset
    }

    return {
      weatherList,
      checkNight,
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
        <li 
          v-for="weather in weatherList"
          :class="{ 'weather-card--night': checkNight(weather.current) }"
          class="weather-card"
        >
          <WeatherAlert v-if = "weather.alert">
              <span class="weather-alert__icon">⚠️</span>
              <span class="weather-alert__description">{{weather.alert.sender_name}}: {{weather.alert.description}}</span>
          </WeatherAlert>

          <div>
            <h2 class="weather-card__name">
              {{weather.geographic_name}}
            </h2>
            <div class="weather-card__time">
              {{weather.current.dt}}
            </div>
          </div>

          <WeatherConditions :title="weather.current.weather.description" :iconId="weather.current.weather.id" :temp="weather.current.temp"/>

          <WeatherDetails :weatherCurrent="weather.current" />
        </li>
      </ul>
    </div>
  `,
})
