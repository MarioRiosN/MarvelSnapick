import { defineStore } from 'pinia'
import { apiStore } from './api'
//import axios from "axios";
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
/* export const cardsStore = defineStore('cards', {
    state: () => ({
        cards: []
    }),

    actions:{
        async fetchCards(){
            try{
                const response = await axios.get("https://localhost:5000/cards");
                this.cards = response.data;
                console.log(this.cards);
                return this.cards;
             }catch(err){
                console.log(err);
                return false;
             }
        }
    },
}) */