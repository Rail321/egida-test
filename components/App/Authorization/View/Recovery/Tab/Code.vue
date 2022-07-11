<template>
  <div>
    <h3>Code</h3>

    <div>
      <button type="button" v-on:click="onClickSubmit">
        <span>Подтвердить</span>
      </button>
    </div>

    <a href="" v-on:click.prevent="onClickBack">
      <span>Назад</span>
    </a>
  </div>
</template>

<script setup>
  import { view as viewOfRecovery } from '@/components/App/Authorization/View/Recovery/state'

  const onClickSubmit = () => viewOfRecovery.value = 'form'
  const onClickBack = () => viewOfRecovery.value = 'entry'
</script>
