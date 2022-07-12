<template>
  <div>
    <div v-if="access">
      <pre>{{ JSON.stringify( access, null, 2 ) }}</pre>

      <button type="button" v-on:click.prevent>Удалить</button>
    </div>

    <div v-else>
      <app-authorization-view-login v-if="view === 'login'" />
      <app-authorization-view-recovery v-if="view === 'recovery'" />
    </div>
  </div>
</template>

<script setup>
  import { view } from './state'
  import access from '@/store/access'
</script>
