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
    {{ rulesContext }} -- {{ modelContext }}
    <span @click="validate">校验</span>
  </div>
</template>

<script setup lang="ts">
  import { computed, inject } from 'vue'
  import { FormContextKey, type FormContext, type FormItemProps } from './types'
  import Schema from 'async-validator'

  const props = defineProps<FormItemProps>()
  const { model, rules } = inject(FormContextKey) as FormContext

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
    console.log(rulesContext.value, modelContext.value)

    // 添加字段校验规则
    const validator = new Schema({
      [props.prop!]: rulesContext.value,
    })

    validator
      .validate({
        [props.prop!]: modelContext.value,
      })
      .then(() => {
        console.log('校验通过')
      })
      .catch((e) => {
        console.log(e.errors)
      })
  }
  // 校验是否为空
  const isUndefineOrNull = (value: any) => {
    return value === undefined || value === null
  }
</script>

<style lang="scss" scoped></style>
