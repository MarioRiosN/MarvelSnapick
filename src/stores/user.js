import { defineStore } from 'pinia'
import { apiStore } from './api'

export const userStore = defineStore('user', {
  state: () => ({
    isLogged: false,
    userLogged: ''
  }),

  actions: {
    async fetchUsers() {
      const method = 'GET'
      const url = '/user/users'
      return apiStore()
        .doRequest({ url, method })
        .then((res) => {
          return res
        })
        .catch((err) => {
          console.log(err)
          return false
        })
    },

    async login({ username, password }) {
      const method = 'POST'
      const url = '/user/login'
      const payload = { username, password }
      return apiStore()
        .doRequest({ method, url, payload })
        .then((res) => {
          this.isLogged = true
          this.userLogged = username
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

    async rename({ userLogged, oldUsername, newUsername }) {
      const method = 'PUT'
      const url = '/user/rename'
      const payload = { userLogged, oldUsername, newUsername }
      return apiStore()
        .doRequest({ method, url, payload })
        .then((res) => {
          this.userLogged = newUsername
          return res
        })
        .catch((error) => {
          console.log(error)
          return false
        })
    },

    async repassword({ userLogged, oldPassword, newPassword }) {
      const method = 'PUT'
      const url = '/user/repassword'
      const payload = { userLogged, oldPassword, newPassword }
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

    async rerol({ username, rol }) {
      const method = 'PUT'
      const url = '/user/rerol'
      const payload = { username, rol }
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

    async deleteUser({ username }) {
      const method = 'DELETE'
      const url = '/user/delete'
      const payload = { username }
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

    async logout() {
      this.isLogged = false
      this.userLogged = ''
      return true
    }
  }
})
