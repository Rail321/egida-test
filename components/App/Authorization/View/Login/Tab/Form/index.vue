<template>
  <div>
    <div>
      <input type="text" v-model="username" />
    </div>

    <div>
      <input type="password" v-model="password" />
    </div>

    <div>
      <button type="button" v-on:click="onClickSubmit">
        <span>Войти</span>
      </button>
    </div>

    <a href="" v-on:click.prevent="onClickToRecovery">
      <span>Восстановить пароль</span>
    </a>
  </div>
</template>

<script setup>
  import requests from '@/requests'
  import { view as viewOfAuthorization } from '@/components/App/Authorization/state'
  import { view as viewOfLogin } from '@/components/App/Authorization/View/Login/state'
  import { username, password } from './state'

  const onClickToRecovery = () => viewOfAuthorization.value = 'recovery'

  const sendCode = async () => {

    const body = [ {
        jsonrpc: '2.0',
        id: '1',
        method: 'send_code',
        params: [ username.value, 'sms' ]
    } ]

    const options = {
      headers: {
        'Content-type': 'application/json+rpc-2.0',
        Accept: 'application/json'
      }
    }

    try {
      await requests.exec( body, options )
      viewOfLogin.value = 'code'
    }
    
    catch( error ) {
      alert( error.response.data.errors.message )
    }
  };

  const onClickSubmit = async () => {

    const body = {
      username: username.value,
      password: password.value,
    }

    try {
      await requests.login( body )
      sendCode()
    }
    
    catch( error ) {
      const errorMessage = error.response.data.errors.message

      if ( [ 'Не найден двух-факторный код', 'Передайте атрибут двух-факторной авторизации' ].includes( errorMessage ) )
        sendCode()
      else
        alert( errorMessage )
    }
  }
</script>
