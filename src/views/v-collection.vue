<template>
    <div v-for="card in cards" :key="card.CardDefId">
        <img :src="'../src/assets/cards/'+card.Img" alt="card.CardDefId">
    </div>
    <div v-if="error">
        Ha habido un error al cargar las cartas.
    </div>
</template>

<script>
import { userStore } from '../stores/user'
import {cardsStore} from '../stores/cards'

export default {
    data() {
        return {
            cards: [],
            error:false
        }
    },
    methods:{
        async loadCards(){
            try{
                const useCardsStore = cardsStore()
                this.cards = await useCardsStore.fetchCards()
                this.fetched=true
                console.log(this.cards)
            } catch (e) {
                console.log(e)
                this.error=true
            }
        }
    },
    created(){
        this.loadCards();
    }
}
</script>

<style scoped>
div{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
img{
    height: 120px;
}
</style>