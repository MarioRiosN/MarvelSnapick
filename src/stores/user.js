import { defineStore } from 'pinia'
import { apiStore } from './api'

export const userStore = defineStore('user', {
   state: () => ({
      isLogged: false,
      userLogged: '',
   }),

   actions: {
      async login({ username, password }) {
         const method = 'POST'
         const url = '/user/login'
         const payload = { username, password }
         return apiStore()
            .doRequest({ method, url, payload })
            .then((res) => {
               this.isLogged = true
               this.userLogged=username;
               return res
            })
            .catch(() => {
               this.isLogged = false
               return false
            })
      },

      async register({ username, password }) {
         const method = 'POST'
         const url = '/user/register'
         const payload = { username, password }
         return apiStore()
         .doRequest({ method, url, payload })
         .then((res) => {
            return res
         })
         .catch((error) => {
            console.log(error)
            return false
         })
      },

      logout() {
         this.isLogged = false
      }
   }
})
