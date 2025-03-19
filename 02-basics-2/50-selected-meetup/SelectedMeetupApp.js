import { defineComponent, ref, watch } from 'vue'
import { getMeetup } from './meetupsService.ts'

export default defineComponent({
  name: 'SelectedMeetupApp',

  setup() {
    const min = 1
    const max = 5
    const meetup = ref(null)
    const meetupId = ref(1)

    watch(
      meetupId,
      async () => {
        const meetupItem = await getMeetup(meetupId.value)
        meetup.value = meetupItem
      },
      { immediate: true },
    )

    return {
      min,
      max,
      meetupId,
      meetup,
    }
  },

  template: `
    <div class="meetup-selector">
      <div class="meetup-selector__control">
        <button 
          :disabled="meetupId <= min"
          @click="meetupId--"
          class="button button--secondary" 
          type="button"
          disabled
        >
          Предыдущий
        </button>

        <div class="radio-group" role="radiogroup">
          <div class="radio-group__button" v-for="id in 5" :key="id">
              <input
                v-model = "meetupId"
                :id="'meetup-id-' + id"
                class="radio-group__input"
                type="radio"
                name="meetupId"
                :value="id"
              />
              <label :for="'meetup-id-' + id" class="radio-group__label">{{id}}</label>
          </div>
        </div>

        <button 
          :disabled="meetupId >= max"
          @click="meetupId++"
          class="button button--secondary" 
          type="button"
        >
          Следующий
        </button>
      </div>

      <div class="meetup-selector__cover">
        <div class="meetup-cover">
          <h1 class="meetup-cover__title" v-if="meetup !== null" > {{meetup.title}} </h1>
        </div>
      </div>

    </div>
  `,
})
