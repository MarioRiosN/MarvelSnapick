import { defineStore } from 'pinia'
import axios from 'axios'

export const apiStore = defineStore('api', {
  state: () => ({
    ax: axios.create(),
    baseURL: 'http://localhost:8081',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  }),

  actions: {
    async doRequest({ url, method, payload }) {
      const { baseURL, headers } = this
      const data = payload ? JSON.stringify(payload) : ''
      return new Promise((resolve, reject) => {
        this.ax
          .request({
            baseURL,
            method,
            headers,
            url,
            data,
            timeout: 5000
          })
          .then((res) => {
            return resolve(res.data)
          })
          .catch((error) => {
            return reject(error)
          })
      })
    }
  }
})
