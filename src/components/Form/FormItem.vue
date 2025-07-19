<template>
  <div
    class="my-form-item"
    :class="{
      'my-form-item--loading': stateItem.loading,
      'my-form-item--success': stateItem.state === 'success',
      'my-form-item--error': stateItem.state === 'error',
    }"
  >
    <label>
      <slot
        name="label"
        :label="label"
        >{{ label }}
      </slot>
    </label>
    <div class="my-form-item__content">
      <slot :validate="validate"></slot>
      <div
        class="my-form-item__error-msg"
        v-if="stateItem.state === 'error'"
      >
        {{ stateItem.errMessage }}
      </div>
    </div>
    {{ rulesContext }} -- {{ modelContext }}
    <span @click="validate">校验</span>
  </div>
</template>

<script setup lang="ts">
  import { computed, inject, provide, reactive } from 'vue'
  import {
    FormContextKey,
    FormItemContextKey,
    type FormContext,
    type FormItemProps,
    type FormValidateFailure,
  } from './types'
  import Schema from 'async-validator'

  const props = defineProps<FormItemProps>()
  const { model, rules } = inject(FormContextKey) as FormContext

  // 记录状态
  const stateItem = reactive({
    state: '',
    errMessage: '',
    loading: false,
  })

  // 获取rules
  const rulesContext = computed(() => {
    if (rules && props.prop && !isUndefineOrNull(rules[props.prop])) {
      return rules[props.prop]
    } else {
      return []
    }
  })

  // 获取model
  const modelContext = computed(() => {
    if (model && props.prop && !isUndefineOrNull(model[props.prop])) {
      return model[props.prop]
    } else {
      return null
    }
  })

  const validate = () => {
    if (!props.prop) return
    stateItem.loading = true
    // 添加字段校验规则
    const validator = new Schema({
      [props.prop]: rulesContext.value,
    })

    validator
      .validate({ [props.prop]: modelContext.value })
      .then(() => {
        stateItem.state = 'success'
        stateItem.errMessage = ''
      })
      .catch((e: FormValidateFailure) => {
        stateItem.state = 'error'
        stateItem.errMessage = e.errors && e.errors.length > 0 ? e.errors[0].message || '' : ''
      })
      .finally(() => {
        stateItem.loading = false
      })
  }
  // 校验是否为空
  const isUndefineOrNull = (value: any) => {
    return value === undefined || value === null
  }

  provide(FormItemContextKey, {
    validate,
  })
</script>

<style lang="scss" scoped></style>
