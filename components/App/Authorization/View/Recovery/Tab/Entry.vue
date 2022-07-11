<template>
  <div>
    <h3>Entry</h3>

    <div>
      <button type="button" v-on:click="onClickSendCode">
        <span>Отправить код</span>
      </button>
    </div>

    <a href="" v-on:click.prevent="onClickToLogin">
      <span>Вернуться к авторизации</span>
    </a>
  </div>
</template>

<script setup>
  import { view as viewOfAuthorization } from '@/components/App/Authorization/state'
  import { view as viewOfRecovery } from '@/components/App/Authorization/View/Recovery/state'

  const onClickSendCode = () => viewOfRecovery.value = 'code'
  
  const onClickToLogin = () => viewOfAuthorization.value = 'login'
</script>
