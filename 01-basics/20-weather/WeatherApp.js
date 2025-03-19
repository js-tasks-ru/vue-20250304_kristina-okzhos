import { defineComponent } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

export default defineComponent({
  name: 'WeatherApp',

  setup() {
    const weatherList = getWeatherData()

    function formatAsTempCelsius(temp) {
      /** Температура должна выводиться в градусах Цельсия с точностью до десятых (°C = °K – 273.15) */
      return (temp - 273.15).toFixed(1)
    }

    function getWeatherIconById(idIcon) {
      /** Погодные условия должны выводиться иконкой из объекта WeatherConditionIcons */
      return WeatherConditionIcons[idIcon]
    }

    function formatPressure(pressure) {
      /** Давление должно выводиться в мм. рт. ст. с точностью до целых (1 hPa = ~0.75 mmHg) */
      return (pressure * 0.75).toFixed(0)
    }

    function checkNight(current) {
      /** Если в месте прогноза ночь (солнце не встало или уже зашло), карточка должна быть тёмной */
      return current.dt < current.sunrise && current.dt < current.sunset
    }

    return {
      weatherList,
      formatAsTempCelsius,
      getWeatherIconById,
      formatPressure,
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
          <div v-if = "weather.alert" class="weather-alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">{{weather.alert.sender_name}}: {{weather.alert.description}}</span>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{weather.geographic_name}}
            </h2>
            <div class="weather-card__time">
              {{weather.current.dt}}
            </div>
          </div>
          <div class="weather-conditions">
            <div 
              class="weather-conditions__icon" 
              :title=" weather.current.weather.description "
            >
              {{getWeatherIconById(weather.current.weather.id)}}
            </div>
            <div class="weather-conditions__temp">{{formatAsTempCelsius(weather.current.temp)}} °C</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{formatPressure(weather.current.pressure)}}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{weather.current.humidity}}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{weather.current.clouds}}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{weather.current.wind_speed}}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
