<script setup lang="ts">
import { defineSlots, defineProps } from 'vue'
import type { PropType, Slot } from 'vue'

const { invalid = undefined } = defineProps<{
  invalid?: PropType<string> //– Имеет ли поле невалидное состояние
}>()

defineSlots<{
  /** Контент заголовка */
  default?: Slot
  /** Контент информации о пользователе */
  label?: Slot<string>
  description?: Slot<string>
}>()
</script>

<template>
  <div class="form-group">
    <div class="form-group__label-wrapper">
      <label :for="$attrs.for" class="form-group__label">
        <slot name="label"> {{ $attrs.label }}</slot>
      </label>
      <div class="form-group__description">
        <slot name="description">{{ $attrs.description }}</slot>
      </div>
    </div>
    <div class="form-group__control"><slot></slot></div>
    <div
      v-if="$attrs.hint || $attrs.showHint"
      :class="{ 'form-group__hint--invalid': invalid }"
      class="form-group__hint"
    >
      <template v-if="$attrs.hint && ($attrs.showHint || invalid)">
        {{ $attrs.hint }}
      </template>
    </div>
  </div>
</template>

<style scoped>
/* _form-group.css */
.form-group {
}

.form-group__label-wrapper {
  margin-block-end: var(--spacing-small);
}

.form-group__label {
  display: block;
  font-size: var(--font-size-control);
}

.form-group__description {
  color: var(--color-dimmed);
}

.form-group__hint {
  font-size: var(--font-size-small);
  color: var(--color-dimmed);
  min-height: 1lh;

  &.form-group__hint--invalid {
    color: var(--color-danger);
  }
}
</style>
