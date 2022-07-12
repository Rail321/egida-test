<template>
  <div>
    <div>
      <input type="text" v-model="username" />
    </div>

    <div>
      <button type="button" v-on:click="onClickSubmit">
        <span>Отправить код</span>
      </button>
    </div>

    <a href="" v-on:click.prevent="onClickToLogin">
      <span>Вернуться к авторизации</span>
    </a>
  </div>
</template>

<script setup>
  import requests from '@/requests'
  import { view as viewOfAuthorization } from '@/components/App/Authorization/state'
  import { view as viewOfRecovery } from '@/components/App/Authorization/View/Recovery/state'
  import { username } from '@/components/App/Authorization/View/Login/Tab/Form/state'
  
  const onClickToLogin = () => viewOfAuthorization.value = 'login'

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
      viewOfRecovery.value = 'code'
    }
    
    catch( error ) {
      alert( error.response.data.errors.message )
    }
  };

  const onClickSubmit = async () => {

    const body = {
      username: username.value
    }

    try {
      await requests.login( body )
    }
    
    catch( error ) {
      const errorMessage = error.response.data.errors.message

      if ( errorMessage === 'Передайте атрибут двух-факторной авторизации' )
        sendCode()
      else
        alert( errorMessage )
    }
  }
</script>
