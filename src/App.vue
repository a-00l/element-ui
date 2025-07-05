<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import Button from './components/Button/Button.vue'
  import type { ButtonInstance } from './components/Button/types'
  import MyCollapseItem from '@/components/Collapse/CollapseItem.vue'
  import Collapse from './components/Collapse/Collapse.vue'
  import Icon from './components/Icon/Icon.vue'
  import Tooltip from './components/Tooltip/Tooltip.vue'
  import type { TooltipInstance } from './components/Tooltip/types'
  import type { Options } from '@popperjs/core'
  import Dropdown from './components/Dropdown/Dropdown.vue'
  import DropdownItem from './components/Dropdown/DropdownItem.vue'
  import DropdownMenu from './components/Dropdown/DropdownMenu.vue'
  import Message from './components/Message/Message.vue'
  import { createMessage } from './components/Message/method'
  const option = ref<Partial<Options>>({ placement: 'bottom' })
  const btn = ref<ButtonInstance>()

  const popper = ref<TooltipInstance>()
  const val = ref('red')
  onMounted(() => {
    console.log(btn.value?.ref)
    setTimeout(() => {
      val.value = 'yellow'
    }, 2000)
  })

  const open = ref()
  const click = () => {
    const msg = createMessage({
      message: 'hello world',
      duration: 0,
    })

    setTimeout(() => {
      msg.destroy()
    }, 2000)
  }
</script>

<template>
  <Button @click="click"></Button>
  <!-- <Message
    message="asdasadsasddas"
    showClose
    :duration="2000"
  ></Message>
  <Message
    message="you"
    showClose
    :duration="2000"
  ></Message>
  <Message
    message="helow"
    showClose
    :duration="0"
  ></Message> -->
  <Dropdown
    placement="right"
    trigger="click"
  >
    <span>click</span>
    <template #dropdown>
      <DropdownMenu>
        <DropdownItem> 123 </DropdownItem>
        <DropdownItem> 123 </DropdownItem>
        <DropdownItem> 123 </DropdownItem>
      </DropdownMenu>
    </template>
  </Dropdown>
  <Tooltip
    content="tooltip"
    ref="popper"
    placement="right"
    trigger="click"
  >
    <Button type="danger">123</Button>
    <template #content>
      <div>123</div>
      <h2>123</h2>
    </template>
  </Tooltip>
  <Icon
    :icon="['fas', 'user-secret']"
    size="40px"
    :color="val"
  ></Icon>
  <div class="container-button">
    <!-- 按钮组件：button -->
    <div class="button">
      <Button ref="btn">登录</Button>
      <Button
        ref="btn"
        type="primary"
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
        @click="popper?.show()"
      >
        登录
      </Button>
      <Button
        ref="btn"
        plain
        type="primary"
        @click="popper?.hide()"
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
      <Button
        size="small"
        :loading="true"
        disabled
        >登录</Button
      >
      <Button
        size="large"
        type="primary"
        icon="arrow-up"
        >登录</Button
      >
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
