<script setup>
// Вместо <span> должен быть <RouterLink> или <a>
// Используйте динамический компонент <component :is="...">
import { computed, toRefs, defineProps } from 'vue'

const props = defineProps({
  to: [String, Object],
  href: String,
  target: String, // или использовать useAttrs()
})

const { to, href, target } = toRefs(props)

// Выбираем компонент: либо RouterLink, либо обычная <a>
const tag = computed(() => (to.value ? 'RouterLink' : 'a'))

// Формируем пропсы для выбранного тега
const linkProps = computed(() => {
  const params = {}
  if (target.value) {
    params.target = target.value
  }
  if (to.value) {
    params.to = to.value
  } else{
    params.href = href.value || '#'
  }
  return params
})
</script>

<template>
  <component :is="tag" v-bind="linkProps" class="link">
    <slot></slot>
  </component>
</template>

<style scoped>
.link {
  color: var(--color-text-primary);
}

.link:hover {
  text-decoration: underline;
}
</style>
