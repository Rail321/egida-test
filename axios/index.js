import axios from 'axios'

export default axios.create( {
  baseURL: 'https://egida.rdbx.dev/api'
} )