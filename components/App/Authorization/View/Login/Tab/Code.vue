<template>
  <div>
    <h3>Code</h3>

    <div>
      <input type="text" v-model="code" />
    </div>

    <div>
      <button type="button" v-on:click="onClickSubmit">
        <span>Подтвердить</span>
      </button>
    </div>

    <a href="" v-on:click.prevent="onClickToForm">
      <span>Назад</span>
    </a>
  </div>
</template>

<script setup>
  import requests from '@/requests'
  import { view as viewOfLogin } from '@/components/App/Authorization/View/Login/state'
  import { username, password } from '@/components/App/Authorization/View/Login/Tab/Form/state'
  import access from '@/store/access'

  const code = ref( '' )
  const acceptToken = ref( null )

  const onClickToForm = () => viewOfLogin.value = 'form'

  const login = async () => {

    const body = {
      username: username.value,
      password: password.value,
      accept_token: acceptToken.value
    }

    try {
      const response = await requests.login( body )
      access.value = response.data
    }
    
    catch ( error ) {
      alert( error.response.errors.message )
    }
  }

  const onClickSubmit = async () => {

    const body = [ {
        jsonrpc: '2.0',
        id: '1',
        method: 'get_accept_token',
        params: [ username.value, code.value, 'sms' ]
    } ]

    const options = {
      headers: {
        'Content-type': 'application/json+rpc-2.0',
        Accept: 'application/json'
      }
    }

    try {
      const response = await requests.exec( body, options )
      const result = response.data[0].result

      if ( result.error )
        alert( result.error.message )
        
      else {
        acceptToken.value = result
      }
    }
    
    catch( error ) {
      alert( error.response.data.errors.message )
    }

    finally {
      login()
    }
  }
</script>
