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
        async addFirstPlayer({userLogged}){
            const method ='POST'
            const url ='/games/addFirstPlayer'
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
        async countPlayers({nombrePartida}){
            const method ='POST'
            const url ='/games/countPlayers'
            const payload={nombrePartida}
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
        async addPlayer({nombrePartida, jugador}){
            const method ='POST'
            const url ='/games/addPlayer'
            const payload={nombrePartida, jugador}
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
        async getPlayerCards({nombrePartida,fillSobre,fillJugador}){
            const method ='POST'
            const url ='/games/getPlayerCards'
            const payload={nombrePartida,fillSobre,fillJugador}
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
        async updatePlayer({nombrePartida,fillSobre,fillJugador,updatedCards}){
            const method ='PUT'
            const url ='/games/updatePlayer'
            const payload={nombrePartida,fillSobre,fillJugador,updatedCards}
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
        async dropTable({nombrePartida}){
            const method ='DELETE'
            const url ='/games/dropTable'
            const payload={nombrePartida}
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