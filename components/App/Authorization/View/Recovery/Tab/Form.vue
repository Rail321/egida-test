<template>
  <div>
    <h3>Form</h3>

    <div>
      <button type="button" v-on:click="onClickSubmit">
        <span>Сохранить</span>
      </button>
    </div>
  </div>
</template>

<script setup>
  import { view as viewOfAuthorization } from '@/components/App/Authorization/state'

  const onClickSubmit = () => viewOfAuthorization.value = 'login'
</script>
