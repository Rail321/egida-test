<template>
  <div>
    <h2>Восстановление доступа</h2>

    <app-authorization-view-recovery-tab-entry v-if="view === 'entry'" />
    <app-authorization-view-recovery-tab-code v-if="view === 'code'" />
    <app-authorization-view-recovery-tab-form v-if="view === 'form'" />
  </div>
</template>

<script setup>
  import { view } from './state'

  onUnmounted( () => view.value = 'entry' )
</script>
