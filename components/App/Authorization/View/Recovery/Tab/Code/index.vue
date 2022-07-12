<template>
  <div>
    <div>
      <input type="text" v-model="code" />
    </div>

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
  import requests from '@/requests'
  import { view as viewOfRecovery } from '@/components/App/Authorization/View/Recovery/state'
  import { username } from '@/components/App/Authorization/View/Login/Tab/Form/state'
  import { acceptToken } from './state'

  const code = ref( '' )

  const onClickBack = () => viewOfRecovery.value = 'entry'
  
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
        viewOfRecovery.value = 'form'
      }
    }
    
    catch( error ) {
      alert( error.response.data.errors.message )
    }
  }
</script>
