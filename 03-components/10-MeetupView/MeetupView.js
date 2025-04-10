import { defineComponent } from 'vue'
import { UiAlert, UiContainer } from '@shgk/vue-course-ui'
import MeetupAgenda from './MeetupAgenda.js'
import MeetupDescription from './MeetupDescription.js'
import MeetupCover from './MeetupCover.js'
import MeetupInfo from './MeetupInfo.js'
import './MeetupView.css'

export default defineComponent({
  name: 'MeetupView',

  components: {
    UiAlert,
    UiContainer,
    MeetupAgenda,
    MeetupDescription,
    MeetupCover,
    MeetupInfo,
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },

  template: `
    <div>

      <!-- Обложка митапа -->
      <UiContainer>
        <div class="meetup">
          <div class="meetup__content">
            <h2>{{ meetup.title }}</h2>
            <MeetupCover 
              :title="meetup.title"
              :image="meetup.image"
            />
            <!-- Описание митапа -->
            <MeetupDescription 
              :description="meetup.description"
            />
            <h2>Программа</h2>
            <template 
              v-if="meetup.agenda.length"
            >
              <MeetupAgenda :agenda="meetup.agenda"/>
              <!-- Программа митапа -->
            </template>
            <template v-else>
              <!-- Или при пустой программе - сообщение "Программа пока пуста..." в UiAlert -->
              <UiAlert>Программа пока пуста…</UiAlert>
            </template>

          </div>
          <div class="meetup__aside">
            <!-- Краткая информация о митапе -->
            <MeetupInfo 
              :organizer="meetup.organizer" 
              :place="meetup.place" 
              :date="meetup.date"
            ></MeetupInfo>
            <div class="meetup__aside-buttons"></div>
          </div>
        </div>
      </UiContainer>
    </div>
  `,
})
