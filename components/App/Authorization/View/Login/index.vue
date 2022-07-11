<template>
  <div>
    <h2>Авторизация</h2>

    <app-authorization-view-login-tab-form v-if="view === 'form'" />
    <app-authorization-view-login-tab-code v-if="view === 'code'" />
  </div>
</template>

<script setup>
  import { view } from './state'

  onUnmounted( () => view.value = 'form' )
</script>
