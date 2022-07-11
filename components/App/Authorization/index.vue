<template>
  <div>
    <pre v-if="access">{{ JSON.stringify( access, null, 2 ) }}</pre>

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
