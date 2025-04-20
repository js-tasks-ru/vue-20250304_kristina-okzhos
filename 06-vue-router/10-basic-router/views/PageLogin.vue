<script setup lang="ts">
import { UiButton, UiFormGroup, UiInput } from '@shgk/vue-course-ui'
import { ref, defineProps } from 'vue'
import MeetupsAuthForm from '../components/MeetupsAuthForm.vue'
import LayoutAuth from '../components/LayoutAuth.vue'
import { login } from '../api.ts'
import { useRouter } from 'vue-router'//, useRoute
const { from } = defineProps({
  from: String
})
const email = ref('demo@email')
const password = ref('password')
const router = useRouter()
// const route = useRoute()

async function onSubmit() {
  try {
    await login(email.value, password.value)
    // Авторизация прошла успешно
    let routerName = 'index'
    if (from === "/foo") {
      // route.query.from === "/foo"
      routerName = 'foo'
    }
    if (from === "/bar") {
      // route.query.from === "/bar"
      routerName = 'bar'
    }

    router.push({
      name: routerName
    })

  } catch (error) {
    alert((error as Error).message)
  }
}
</script>

<template>
  <LayoutAuth title="Вход">
    <MeetupsAuthForm @submit="onSubmit">
      <UiFormGroup label="Email">
        <UiInput v-model="email" name="email" type="email" placeholder="demo@email" large required />
      </UiFormGroup>

      <UiFormGroup label="Пароль">
        <UiInput v-model="password" name="password" type="password" placeholder="password" large required />
      </UiFormGroup>

      <template #submit>
        <UiButton kind="primary" type="submit" wide size="large">Войти</UiButton>
      </template>

      <template #append>
        Нет аккаунта?
        <RouterLink :to="{ name: 'register' }">Зарегистрируйтесь</RouterLink>
      </template>
    </MeetupsAuthForm>
  </LayoutAuth>
</template>
