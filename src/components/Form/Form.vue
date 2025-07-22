<template>
  <form class="my-form">
    <slot></slot>
  </form>
</template>

<script setup lang="ts">
  import { provide } from 'vue'
  import {
    FormContextKey,
    type FormInstance,
    type FormItemContext,
    type FormProps,
    type FormValidateFailure,
  } from './types'
  import type { ValidateFieldsError } from 'async-validator'

  const props = defineProps<FormProps>()

  // 保存所有FormItem的信息
  const formContext: FormItemContext[] = []
  // 添加Field
  const addField = (field: FormItemContext) => {
    formContext.push(field)
  }

  // 删除Field
  const removeField = (field: FormItemContext) => {
    formContext.splice(formContext.indexOf(field), 1)
  }

  const validate = async () => {
    // 存储错误信息
    let validateErros: ValidateFieldsError = {}
    // 校验所有字段
    for (const field of formContext) {
      try {
        await field.validate('')
      } catch (e) {
        const error = e as FormValidateFailure
        // 合并错误
        validateErros = {
          ...validateErros,
          ...error.fields,
        }
      }
    }

    // 校验通过
    if (!Object.keys(validateErros).length) return true

    // 校验失败，返回错误信息
    return Promise.reject(validateErros)
  }

  // 清除错误信息
  const clearValidate = (keys: string[] = []) => {
    const clearKeys =
      keys.length > 0 ? formContext.filter((field) => keys.includes(field?.prop!)) : formContext

    clearKeys.forEach((item) => item.clearValidate())
  }

  // 清除错误信息，重置表单为初始值
  const resetFields = (keys: string[] = []) => {
    const resetKeys =
      keys.length > 0 ? formContext.filter((field) => keys.includes(field?.prop!)) : formContext

    resetKeys.forEach((item) => item.resetField())
  }

  provide(FormContextKey, {
    model: props.model,
    rules: props.rules,
    addField,
    removeField,
  })

  defineExpose<FormInstance>({
    validate,
    clearValidate,
    resetFields,
  })
</script>

<style scoped></style>
