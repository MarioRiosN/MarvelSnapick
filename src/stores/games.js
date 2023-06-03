import { defineStore } from 'pinia'
import { apiStore } from './api'

export const gamesStore = defineStore('games', {
    state: () => ({
    }),

    actions:{
        async createDraft({userLogged}){
            const method = 'POST'
            const url = '/games/createDraft'
            const payload={userLogged}
            return apiStore()
                .doRequest({url,method,payload})
                .then((res) => {
                    return res
                })
                .catch((err) => {
                    console.log(err)
                    return false
                })
        },
    }
})