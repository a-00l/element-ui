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
  </div>
</template>

<script setup lang="ts">
  import { computed, inject, onMounted, onUnmounted, provide, reactive } from 'vue'
  import {
    FormContextKey,
    FormItemContextKey,
    type FormContext,
    type FormItemContext,
    type FormItemProps,
    type FormValidateFailure,
  } from './types'
  import Schema from 'async-validator'

  const props = defineProps<FormItemProps>()
  const { model, rules, addField, removeField } = inject(FormContextKey) as FormContext

  // 记录状态
  const stateItem = reactive({
    state: '',
    errMessage: '',
    loading: false,
  })

  // 记录初始值
  let initInnerValue: any = null
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

  const getFormItemRules = (trigger?: string) => {
    const rules = rulesContext.value
    if (rules) {
      return rules.filter((rule) => {
        // 没有trigger，任何情况下都校验
        if (!rule.trigger || !trigger) return true

        // 对应trigger下校验
        return rule.trigger && trigger === rule.trigger
      })
    } else {
      return []
    }
  }

  // 用于校验
  const validate = (trigger?: string) => {
    if (!props.prop) return
    stateItem.loading = true
    // 添加字段校验规则
    const validator = new Schema({
      [props.prop]: getFormItemRules(trigger),
    })

    // 校验
    return validator
      .validate({ [props.prop]: modelContext.value })
      .then(() => {
        stateItem.state = 'success'
        stateItem.errMessage = ''
      })
      .catch((e: FormValidateFailure) => {
        stateItem.state = 'error'
        stateItem.errMessage = e.errors && e.errors.length > 0 ? e.errors[0].message || '' : ''
        return Promise.reject(e)
      })
      .finally(() => {
        stateItem.loading = false
      })
  }
  // 校验是否为空
  const isUndefineOrNull = (value: any) => {
    return value === undefined || value === null
  }

  // 清除校验结果
  const clearValidate = () => {
    stateItem.errMessage = ''
    stateItem.loading = false
    stateItem.state = 'init'
  }

  // 重置表单
  const resetField = () => {
    clearValidate()
    // 重置为初始值
    if (model && props.prop && !isUndefineOrNull(model[props.prop])) {
      model[props.prop] = initInnerValue
    }
  }

  const context: FormItemContext = {
    validate,
    prop: props.prop || '',
    clearValidate,
    resetField,
  }

  onMounted(() => {
    if (props.prop) {
      addField(context)
      // 保存初始值
      initInnerValue = modelContext.value
    }
  })

  onUnmounted(() => {
    if (props.prop) {
      removeField(context)
    }
  })

  provide(FormItemContextKey, context)
</script>

<style lang="scss" scoped></style>
