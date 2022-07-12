<template>
  <div>
    <div>
      <input type="password" v-model="password" />
    </div>
    
    <div>
      <input type="password" v-model="passwordRepeat" />
    </div>

    <div>
      <button type="button" v-on:click="onClickSubmit">
        <span>Сохранить</span>
      </button>
    </div>
  </div>
</template>

<script setup>
  import requests from '@/requests'
  import { view as viewOfAuthorization } from '@/components/App/Authorization/state'
  import { username } from '@/components/App/Authorization/View/Login/Tab/Form/state'
  import { acceptToken } from '@/components/App/Authorization/View/Recovery/Tab/Code/state'

  const password = ref( '' )
  const passwordRepeat = ref( '' )

  const onClickSubmit = async () => {

    if ( password.value !== passwordRepeat.value ) return alert( 'Пароли должны совпадать' )

    const body = {
      username: username.value,
      accept_token: acceptToken.value,
      password: password.value
    }

    try {
      await requests.recovery( body )
      viewOfAuthorization.value = 'login'
    }

    catch( error ) {
      alert( error.response.data.errors.message )
    }
  }
</script>
