import axios from 'axios'

export function fetchData () {
  return axios({
    method: 'get',
    url: 'http//localhost:3030/data'
  })
}
