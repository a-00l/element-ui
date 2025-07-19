<template>
  <div class="my-form-item">
    <label>
      <slot
        name="label"
        :label="label"
        >{{ label }}
      </slot>
    </label>
    <div class="my-form-item__content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { inject } from 'vue'
  import { FormContextKey, type FormContext, type FormItemProps } from './types'

  const props = defineProps<FormItemProps>()
  const { model, rules } = inject(FormContextKey) as FormContext

  // 获取rules
  const rulesContext = () => {
    if (rules && props.prop && !isUndefineOrNull(rules[props.prop])) {
      return rules[props.prop]
    } else {
      return []
    }
  }

  // 获取model
  const modelContext = () => {
    if (model && props.prop && !isUndefineOrNull(model[props.prop])) {
      return model[props.prop]
    } else {
      return null
    }
  }

  // 校验是否为空
  const isUndefineOrNull = (value: any) => {
    return value === undefined || value === null
  }
</script>

<style lang="scss" scoped></style>
