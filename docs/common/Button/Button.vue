<template>
  <div class="mb-4">
    <my-button>Default</my-button>
    <my-button type="primary"> Primary </my-button>
    <my-button type="success"> Success </my-button>
    <my-button type="info"> Info </my-button>
    <my-button type="warning"> Warning </my-button>
    <my-button type="danger">Danger</my-button>
  </div>
  <div class="mb-4">
    <my-button plain>Plain</my-button>
    <my-button type="primary" plain>Primary</my-button>
    <my-button type="success" plain>Success</my-button>
    <my-button type="info" plain>Info</my-button>
    <my-button type="warning" plain>Warning</my-button>
    <my-button type="danger" plain>Danger</my-button>
  </div>
  <div class="mb-4">
    <my-button round>Round</my-button>
    <my-button type="primary" round>Primary</my-button>
    <my-button type="success" round>Success</my-button>
    <my-button type="info" round>Info</my-button>
    <my-button type="warning" round>Warning</my-button>
    <my-button type="danger" round>Danger</my-button>
  </div>
  <div>
    <my-button circle icon="search">
    </my-button>
    <my-button circle type="primary" icon="cat">
    </my-button>
    <my-button circle type="success" icon="envmyope">
    </my-button>
    <my-button circle type="info" icon="check">
    </my-button>
    <my-button circle type="warning" icon="star">
    </my-button>
    <my-button circle type="danger" icon="trash-alt">
    </my-button>
  </div>
</template>

<script setup>
import myButton from '@/components/Button/Button.vue'
import Icon from '@/components/Icon/Icon.vue'
</script>

<style scoped>
.mb-4 {
  margin-bottom: 1rem;
}
</style>
