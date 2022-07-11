import axios from '@/axios'

const login = ( body = {}, options = {} ) => {
  return axios.post( '/auth/jwt/login', body, options )
}

const exec = ( body = {}, options = {} ) => {
  return axios.post( '/tool/exec', body, options )
}

export default {
  login,
  exec
}