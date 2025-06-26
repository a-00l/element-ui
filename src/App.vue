<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import Button from './components/Button/Button.vue'
  import type { ButtonInstance } from './components/Button/types'
  import MyCollapseItem from '@/components/Collapse/CollapseItem.vue'
  import Collapse from './components/Collapse/Collapse.vue'
  const btn = ref<ButtonInstance>()
  onMounted(() => {
    console.log(btn.value?.ref)
    setTimeout(() => {
      open.value = ['123', '12']
    }, 2000)
  })

  const open = ref()
</script>

<template>
  <div class="container-button">
    <!-- 按钮组件：button -->
    <div class="button">
      <Button ref="btn">登录</Button>
      <Button
        ref="btn"
        type="primary"
        :class="{ 'my-button--primary': true }"
      >
        登录
      </Button>
      <Button
        ref="btn"
        type="success"
      >
        登录
      </Button>
      <Button
        ref="btn"
        type="info"
      >
        登录
      </Button>
      <Button
        ref="btn"
        type="warning"
      >
        登录
      </Button>
      <Button
        ref="btn"
        type="danger"
      >
        登录
      </Button>
    </div>

    <div class="button">
      <Button
        ref="btn"
        plain
      >
        登录
      </Button>
      <Button
        ref="btn"
        plain
        type="primary"
      >
        登录
      </Button>
      <Button
        ref="btn"
        plain
        type="success"
      >
        登录
      </Button>
      <Button
        ref="btn"
        plain
        type="info"
      >
        登录
      </Button>
      <Button
        ref="btn"
        plain
        type="warning"
      >
        登录
      </Button>
      <Button
        ref="btn"
        plain
        type="danger"
      >
        登录
      </Button>
    </div>

    <div class="button">
      <Button
        ref="btn"
        round
      >
        登录
      </Button>
      <Button
        ref="btn"
        round
        type="primary"
      >
        登录
      </Button>
      <Button
        ref="btn"
        round
        type="success"
      >
        登录
      </Button>
      <Button
        ref="btn"
        round
        type="info"
      >
        登录
      </Button>
      <Button
        ref="btn"
        round
        type="warning"
      >
        登录
      </Button>
      <Button
        ref="btn"
        round
        type="danger"
      >
        登录
      </Button>
    </div>

    <div class="button">
      <Button
        ref="btn"
        circle
      >
        1
      </Button>
      <Button
        ref="btn"
        circle
        type="primary"
      >
        1
      </Button>
      <Button
        ref="btn"
        circle
        type="success"
      >
        1
      </Button>
      <Button
        ref="btn"
        circle
        type="info"
      >
        1
      </Button>
      <Button
        ref="btn"
        circle
        type="warning"
      >
        1
      </Button>
      <Button
        ref="btn"
        circle
        type="danger"
      >
        1
      </Button>
    </div>
    <div class="button">
      <Button size="small">登录</Button>
      <Button size="large">登录</Button>
    </div>

    <!-- 折叠组件：Collapse -->
    <Collapse v-model="open">
      <MyCollapseItem
        name="123"
        title="标题"
        disabled
      >
        <h1>123</h1>
      </MyCollapseItem>

      <MyCollapseItem
        name="12"
        title="标题"
      >
        <h1>123</h1>
      </MyCollapseItem>

      <MyCollapseItem
        name="1"
        title="标题"
      >
        <h1>123</h1>
      </MyCollapseItem>

      {{ open }}
    </Collapse>
  </div>
</template>

<style scoped>
  .button {
    margin-top: 20px;
    margin-left: 100px;
  }

  .button button {
    margin-left: 10px;
  }
</style>
