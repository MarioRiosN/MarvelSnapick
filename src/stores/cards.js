import { defineStore } from 'pinia'
import { apiStore } from './api'

export const cardsStore = defineStore('cards', {
  state: () => ({
    cards: []
  }),

  actions: {
    async fetchCards() {
      const method = 'GET'
      const url = '/cards'
      return apiStore()
        .doRequest({ url, method })
        .then((res) => {
          this.cards = res
          return res
        })
        .catch((err) => {
          console.log(err)
          return false
        })
    },

    async addCard({CardDefId, series, Img}){
      const method ='POST'
      const url='/cards/addCard'
      const payload={CardDefId, series, Img}
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

    async deleteCard({ CardDefId }) {
      const method = 'DELETE'
      const url = '/cards/deleteCard'
      const payload = { CardDefId }
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

    async editSeries({ CardDefId, newSeries }) {
      const method = 'PUT'
      const url = '/cards/editSeries'
      const payload = { CardDefId, newSeries }
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

    async getCard({id}){
      const method = 'POST'
      const url = '/cards/getCard'
      const payload = {id}
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

  }
})
