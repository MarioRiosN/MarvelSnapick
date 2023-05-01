import { defineStore } from 'pinia'
import { apiStore } from './api'

export const cardsStore = defineStore('cards', {
    state: () => ({
        cards: []
    }),

    actions:{
        async fetchCards(){
            const method ='GET'
            const url = '/cards/loadCards'
            return apiStore()
                .doRequest({url, method})
                .then(res => {
                    this.cards=res
                    return res
                })
                .catch((err) => {
                    console.log(err)
                    return false
                })
        }
    },
})