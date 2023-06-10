<template>
    <l-game>
      <template #header>
        <c-header>
          <template #user>
            <c-user :innerText="userLogged">
              <template #icon>
                <c-icon iconName="logout" @click="doLogout" />
              </template>
            </c-user>
          </template>
          <template #buttonMenu>
            <c-button class="v-draftGame__button--menu" @click="goMenu(e)" innerText="MENU"></c-button>
          </template>
        </c-header>
      </template>
      <template #title>
        <h1>DRAFT {{nombrePartida}}</h1>
      </template>
      <template #msg>
        <div class="v-draftGame__msg" v-if="this.players<=4">
            <h2>Bienvenid@ a la partida de {{ nombrePartida }}, eres el jugador {{ jugador }}</h2>
            <h3>Esperando jugadores {{ players }}/4</h3>
        </div>
      </template>
      <!-- <template #button>
        <c-button
          v-if="this.selladoCards.length !== 0"
          @click="nextSobre"
          innerText="SIGUIENTE"
        ></c-button>
        <c-button v-else @click="getCode" innerText="CÓDIGO DEL MAZO"></c-button>
        <h2>{{ msg }}</h2>
      </template> -->
      <!-- <template #cards>
        <div v-if="this.selladoCards.length !== 0">
          <h1>Sobre: {{ this.sobre }}/3</h1>
          <c-cards-image
            :src="this.selladoCards.at(-1).Img"
            :alt="this.selladoCards.at(-1).CardDefId"
          />
          <c-cards-image
            :src="this.selladoCards.at(-2).Img"
            :alt="this.selladoCards.at(-2).CardDefId"
          />
          <c-cards-image
            :src="this.selladoCards.at(-3).Img"
            :alt="this.selladoCards.at(-3).CardDefId"
          />
          <c-cards-image
            :src="this.selladoCards.at(-4).Img"
            :alt="this.selladoCards.at(-4).CardDefId"
          />
          <c-cards-image
            :src="this.selladoCards.at(-5).Img"
            :alt="this.selladoCards.at(-5).CardDefId"
          />
          <c-cards-image
            :src="this.selladoCards.at(-6).Img"
            :alt="this.selladoCards.at(-6).CardDefId"
          />
        </div>
        <div v-else>
          <c-cards-image
            v-for="card in selladoDeck"
            :key="card.CardDefId"
            :src="card.Img"
            :alt="card.CardDefId"
            :have="card.have"
            @click="changeColor($event)"
            class="notHave"
          />
        </div>
      </template> -->
    </l-game>
</template>

<script>
import LGame from '../layouts/l-game.vue'
import CHeader from '../components/c-header.vue'
import CUser from '../components/c-user.vue'
import CIcon from '../components/c-icon.vue'
import CButton from '../components/c-button.vue'
import CCardsImage from '../components/c-cards-image.vue'
import { userStore } from '../stores/user'
import {gamesStore} from '../stores/games'

export default {
    components: {
        LGame,
        CButton,
        CHeader,
        CUser,
        CCardsImage,
        CIcon
    },
    data(){
        return{
            players:1,
            timerCheck:null,
        }
    },
    props: {
        nombrePartida: {
            type: String,
            required: true
        },
        jugador:{
            type: String,
            required:true
        }
    },
    methods:{
        async countPlayers(){
            const {nombrePartida}=this
            const numPlayers = await gamesStore().countPlayers({nombrePartida})
            this.players=Object.values(numPlayers[0])[0]
            if(this.players==4){
                clearInterval(this.timerCheck)
            }
        },
        async loadUser() {
            this.userLogged = userStore().userLogged
        },
        goMenu() {
            this.$router.push({ name: 'menu' })
        },
        async doLogout() {
            const doLogout = await userStore().logout()
            if (doLogout) {
                this.$router.push({ name: 'login' })
            } else {
                this.sendError()
            }
        }
    },
    created() {
        this.loadUser()
        this.timerCheck = setInterval(() => {
            this.countPlayers()
        }, 1000) 
    },
    beforeUnmount(){
        clearInterval(this.timerCheck)
    }
}
</script>

<style lang="scss">
.v-draftGame__button--menu {
  max-width: 80px;
  max-height: 40px;
  border-radius: 5px;
  font-weight: bold;
  text-align: center;
  display: flex;
  justify-content: center;
  font-size: medium;
}
.v-draftGame__msg{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.notHave {
  filter: grayscale(100%);
}
</style>