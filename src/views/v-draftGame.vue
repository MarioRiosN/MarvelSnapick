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
      <template v-if="this.players<4" #msg>
        <div class="v-draftGame__msg">
            <h2>Bienvenid@ a la partida de {{ nombrePartida }}, eres el jugador {{ jugador }}</h2>
            <h3>Esperando jugadores {{ players }}/4</h3>
        </div>
      </template>
      <template #button>
        <c-button v-if="this.pick==19" @click="getCode" innerText="CÓDIGO DEL MAZO"></c-button>
        <h2>{{ msg }}</h2>
      </template>
      <template v-if="this.players==4" #cards>
        <div v-if="this.pick<19">
          <h1>Pick: {{this.pick}}/18  Sobre: {{ this.sobre }}/3</h1>
          <c-cards-image
            v-for="card in cards"
            :key="card.CardDefId"
            :src="card.Img"
            :alt="card.CardDefId"
            @click="pickCard($event)"
            class="notHave"
          />
        </div>
        <div v-else>
          <c-cards-image
            v-for="card in draftMazoFinal"
            :key="card.CardDefId"
            :src="card.Img"
            :alt="card.CardDefId"
            :have="card.have"
            @click="changeColor($event)"
            class="notHave"
          />
        </div>
      </template>
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
import { gamesStore } from '../stores/games'
import { cardsStore } from '../stores/cards'

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
            timerTurn:null,
            timerWait:null,
            pick:1,
            sobre:1,
            cards:[],
            draftMazo:[],
            draftMazoFinal:[],
            playerCards:[],
            fillSobre:'',
            fillJugador:'',
            msg: '',
            id:'',
            idPicked:'',
            updatedCards:'',
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
                this.timerTurn = setInterval(() => {
                    this.updateDatabase()
                  if(this.pick<19){
                    this.fillPlayerCards()
                    this.fillCards()
                  } else{
                    console.log(this.draftMazo)
                    clearInterval(this.timerTurn)
                    this.getMazoFinal()
                  }              
                }, 7000)
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
        },
        pickCard(event) {
          if (event) {
            if (event.target.classList.contains('notHave')) {
              event.target.classList.remove('notHave')
              this.idPicked=event.target.alt
              console.log(this.idPicked)
            } else {
              event.target.classList.add('notHave')
            }
          }
        },
        changeColor(event) {
          if (event) {
            if (event.target.classList.contains('notHave')) {
              event.target.classList.remove('notHave')
            } else {
              event.target.classList.add('notHave')
            }
          }
        },
        getCode() {
          var deck = []
          var allCards = document.getElementsByClassName('c-cards-image')
          for (let i = 0; i < allCards.length; i++) {
            if (!allCards[i].classList.contains('notHave')) {
              var myObj = {
                'CardDefId': allCards[i].getAttribute('alt'),
                'Img': allCards[i].getAttribute('src')
              }
              deck.push(myObj)
            }
          }
          console.log(deck)
          if (deck.length === 12) {
            let link =
              "{'Name':'test','Cards':[{'CardDefId':'" +
              deck[0].CardDefId +
              "'},{'CardDefId':'" +
              deck[1].CardDefId +
              "'},{'CardDefId':'" +
              deck[2].CardDefId +
              "'},{'CardDefId':'" +
              deck[3].CardDefId +
              "'},{'CardDefId':'" +
              deck[4].CardDefId +
              "'},{'CardDefId':'" +
              deck[5].CardDefId +
              "'},{'CardDefId':'" +
              deck[6].CardDefId +
              "'},{'CardDefId':'" +
              deck[7].CardDefId +
              "'},{'CardDefId':'" +
              deck[8].CardDefId +
              "'},{'CardDefId':'" +
              deck[9].CardDefId +
              "'},{'CardDefId':'" +
              deck[10].CardDefId +
              "'},{'CardDefId':'" +
              deck[11].CardDefId +
              "'}]}"
            this.codigoMazo = window.btoa(link)
            navigator.clipboard.writeText(this.codigoMazo)
            this.msg = 'Código copiado'
            console.log(this.codigoMazo)
          } else {
            this.msg = 'El mazo debe contener 12 cartas'
          }
        },
        async updateDatabase(){
          if(this.playerCards.indexOf(this.idPicked)!=-1){
            this.playerCards.splice(this.playerCards.indexOf(this.idPicked),1)
            this.draftMazo.push(this.idPicked)
            console.log(this.playerCards, 'después de splice')
            this.updatedCards=this.playerCards.toString()
            var {nombrePartida,fillSobre,fillJugador,updatedCards}=this
            console.log({nombrePartida,fillSobre,fillJugador,updatedCards}, 'estos son los args')
            const updatePlayer=await gamesStore().updatePlayer({nombrePartida,fillSobre,fillJugador,updatedCards})
            this.pick++
            this.timerWait = setInterval(() => {
              clearInterval(this.timerWait)
            }, 5000)
          }
        },
        async fillPlayerCards(){
          switch(this.pick){
            case 1: case 5:
              if(this.jugador==1){
                this.fillSobre='sobre1'
                this.fillJugador='1'
                var {nombrePartida,fillSobre, fillJugador}=this
                this.playerCards=await gamesStore().getPlayerCards({nombrePartida,fillSobre,fillJugador})
              }else if(this.jugador==2){
                this.fillSobre='sobre1'
                this.fillJugador='2'
                var {nombrePartida,fillSobre, fillJugador}=this
                this.playerCards=await gamesStore().getPlayerCards({nombrePartida,fillSobre,fillJugador})
              }else if(this.jugador==3){
                this.fillSobre='sobre1'
                this.fillJugador='3'
                var {nombrePartida,fillSobre, fillJugador}=this
                this.playerCards=await gamesStore().getPlayerCards({nombrePartida,fillSobre,fillJugador})
              }else{
                this.fillSobre='sobre1'
                this.fillJugador='4'
                var {nombrePartida,fillSobre, fillJugador}=this
                this.playerCards=await gamesStore().getPlayerCards({nombrePartida,fillSobre,fillJugador})
              }
              break;
            case 2: case 6:
              if(this.jugador==1){
                this.fillSobre='sobre1'
                this.fillJugador='4'
                var {nombrePartida,fillSobre, fillJugador}=this
                this.playerCards=await gamesStore().getPlayerCards({nombrePartida,fillSobre,fillJugador})
              }else if(this.jugador==2){
                this.fillSobre='sobre1'
                this.fillJugador='1'
                var {nombrePartida,fillSobre, fillJugador}=this
                this.playerCards=await gamesStore().getPlayerCards({nombrePartida,fillSobre,fillJugador})
              }else if(this.jugador==3){
                this.fillSobre='sobre1'
                this.fillJugador='2'
                var {nombrePartida,fillSobre, fillJugador}=this
                this.playerCards=await gamesStore().getPlayerCards({nombrePartida,fillSobre,fillJugador})
              }else{
                this.fillSobre='sobre1'
                this.fillJugador='3'
                var {nombrePartida,fillSobre, fillJugador}=this
                this.playerCards=await gamesStore().getPlayerCards({nombrePartida,fillSobre,fillJugador})
              }
              break;
            case 3:
              if(this.jugador==1){
                this.fillSobre='sobre1'
                this.fillJugador='3'
                var {nombrePartida,fillSobre, fillJugador}=this
                this.playerCards=await gamesStore().getPlayerCards({nombrePartida,fillSobre,fillJugador})
              }else if(this.jugador==2){
                this.fillSobre='sobre1'
                this.fillJugador='4'
                var {nombrePartida,fillSobre, fillJugador}=this
                this.playerCards=await gamesStore().getPlayerCards({nombrePartida,fillSobre,fillJugador})
              }else if(this.jugador==3){
                this.fillSobre='sobre1'
                this.fillJugador='1'
                var {nombrePartida,fillSobre, fillJugador}=this
                this.playerCards=await gamesStore().getPlayerCards({nombrePartida,fillSobre,fillJugador})
              }else{
                this.fillSobre='sobre1'
                this.fillJugador='2'
                var {nombrePartida,fillSobre, fillJugador}=this
                this.playerCards=await gamesStore().getPlayerCards({nombrePartida,fillSobre,fillJugador})
              }
              break;
            case 4:
              if(this.jugador==1){
                this.fillSobre='sobre1'
                this.fillJugador='2'
                var {nombrePartida,fillSobre, fillJugador}=this
                this.playerCards=await gamesStore().getPlayerCards({nombrePartida,fillSobre,fillJugador})
              }else if(this.jugador==2){
                this.fillSobre='sobre1'
                this.fillJugador='3'
                var {nombrePartida,fillSobre, fillJugador}=this
                this.playerCards=await gamesStore().getPlayerCards({nombrePartida,fillSobre,fillJugador})
              }else if(this.jugador==3){
                this.fillSobre='sobre1'
                this.fillJugador='4'
                var {nombrePartida,fillSobre, fillJugador}=this
                this.playerCards=await gamesStore().getPlayerCards({nombrePartida,fillSobre,fillJugador})
              }else{
                this.fillSobre='sobre1'
                this.fillJugador='1'
                var {nombrePartida,fillSobre, fillJugador}=this
                this.playerCards=await gamesStore().getPlayerCards({nombrePartida,fillSobre,fillJugador})
              }
              break;
            case 7: case 11:
              if(this.jugador==1){
                this.fillSobre='sobre2'
                this.fillJugador='1'
                var {nombrePartida,fillSobre, fillJugador}=this
                this.playerCards=await gamesStore().getPlayerCards({nombrePartida,fillSobre,fillJugador})
              }else if(this.jugador==2){
                this.fillSobre='sobre2'
                this.fillJugador='2'
                var {nombrePartida,fillSobre, fillJugador}=this
                this.playerCards=await gamesStore().getPlayerCards({nombrePartida,fillSobre,fillJugador})
              }else if(this.jugador==3){
                this.fillSobre='sobre2'
                this.fillJugador='3'
                var {nombrePartida,fillSobre, fillJugador}=this
                this.playerCards=await gamesStore().getPlayerCards({nombrePartida,fillSobre,fillJugador})
              }else{
                this.fillSobre='sobre2'
                this.fillJugador='4'
                var {nombrePartida,fillSobre, fillJugador}=this
                this.playerCards=await gamesStore().getPlayerCards({nombrePartida,fillSobre,fillJugador})
              }
              break;
            case 8: case 12:
              if(this.jugador==1){
                this.fillSobre='sobre2'
                this.fillJugador='4'
                var {nombrePartida,fillSobre, fillJugador}=this
                this.playerCards=await gamesStore().getPlayerCards({nombrePartida,fillSobre,fillJugador})
              }else if(this.jugador==2){
                this.fillSobre='sobre2'
                this.fillJugador='1'
                var {nombrePartida,fillSobre, fillJugador}=this
                this.playerCards=await gamesStore().getPlayerCards({nombrePartida,fillSobre,fillJugador})
              }else if(this.jugador==3){
                this.fillSobre='sobre2'
                this.fillJugador='2'
                var {nombrePartida,fillSobre, fillJugador}=this
                this.playerCards=await gamesStore().getPlayerCards({nombrePartida,fillSobre,fillJugador})
              }else{
                this.fillSobre='sobre2'
                this.fillJugador='3'
                var {nombrePartida,fillSobre, fillJugador}=this
                this.playerCards=await gamesStore().getPlayerCards({nombrePartida,fillSobre,fillJugador})
              }
              break;
            case 9:
              if(this.jugador==1){
                this.fillSobre='sobre2'
                this.fillJugador='3'
                var {nombrePartida,fillSobre, fillJugador}=this
                this.playerCards=await gamesStore().getPlayerCards({nombrePartida,fillSobre,fillJugador})
              }else if(this.jugador==2){
                this.fillSobre='sobre2'
                this.fillJugador='4'
                var {nombrePartida,fillSobre, fillJugador}=this
                this.playerCards=await gamesStore().getPlayerCards({nombrePartida,fillSobre,fillJugador})
              }else if(this.jugador==3){
                this.fillSobre='sobre2'
                this.fillJugador='1'
                var {nombrePartida,fillSobre, fillJugador}=this
                this.playerCards=await gamesStore().getPlayerCards({nombrePartida,fillSobre,fillJugador})
              }else{
                this.fillSobre='sobre2'
                this.fillJugador='2'
                var {nombrePartida,fillSobre, fillJugador}=this
                this.playerCards=await gamesStore().getPlayerCards({nombrePartida,fillSobre,fillJugador})
              }
              break;
            case 10:
              if(this.jugador==1){
                this.fillSobre='sobre2'
                this.fillJugador='2'
                var {nombrePartida,fillSobre, fillJugador}=this
                this.playerCards=await gamesStore().getPlayerCards({nombrePartida,fillSobre,fillJugador})
              }else if(this.jugador==2){
                this.fillSobre='sobre2'
                this.fillJugador='3'
                var {nombrePartida,fillSobre, fillJugador}=this
                this.playerCards=await gamesStore().getPlayerCards({nombrePartida,fillSobre,fillJugador})
              }else if(this.jugador==3){
                this.fillSobre='sobre2'
                this.fillJugador='4'
                var {nombrePartida,fillSobre, fillJugador}=this
                this.playerCards=await gamesStore().getPlayerCards({nombrePartida,fillSobre,fillJugador})
              }else{
                this.fillSobre='sobre2'
                this.fillJugador='1'
                var {nombrePartida,fillSobre, fillJugador}=this
                this.playerCards=await gamesStore().getPlayerCards({nombrePartida,fillSobre,fillJugador})
              }
              break;
            case 13: case 17:
              if(this.jugador==1){
                this.fillSobre='sobre3'
                this.fillJugador='1'
                var {nombrePartida,fillSobre, fillJugador}=this
                this.playerCards=await gamesStore().getPlayerCards({nombrePartida,fillSobre,fillJugador})
              }else if(this.jugador==2){
                this.fillSobre='sobre3'
                this.fillJugador='2'
                var {nombrePartida,fillSobre, fillJugador}=this
                this.playerCards=await gamesStore().getPlayerCards({nombrePartida,fillSobre,fillJugador})
              }else if(this.jugador==3){
                this.fillSobre='sobre3'
                this.fillJugador='3'
                var {nombrePartida,fillSobre, fillJugador}=this
                this.playerCards=await gamesStore().getPlayerCards({nombrePartida,fillSobre,fillJugador})
              }else{
                this.fillSobre='sobre3'
                this.fillJugador='4'
                var {nombrePartida,fillSobre, fillJugador}=this
                this.playerCards=await gamesStore().getPlayerCards({nombrePartida,fillSobre,fillJugador})
              }
              break;
            case 14: case 18:
              if(this.jugador==1){
                this.fillSobre='sobre3'
                this.fillJugador='4'
                var {nombrePartida,fillSobre, fillJugador}=this
                this.playerCards=await gamesStore().getPlayerCards({nombrePartida,fillSobre,fillJugador})
              }else if(this.jugador==2){
                this.fillSobre='sobre3'
                this.fillJugador='1'
                var {nombrePartida,fillSobre, fillJugador}=this
                this.playerCards=await gamesStore().getPlayerCards({nombrePartida,fillSobre,fillJugador})
              }else if(this.jugador==3){
                this.fillSobre='sobre3'
                this.fillJugador='2'
                var {nombrePartida,fillSobre, fillJugador}=this
                this.playerCards=await gamesStore().getPlayerCards({nombrePartida,fillSobre,fillJugador})
              }else{
                this.fillSobre='sobre3'
                this.fillJugador='3'
                var {nombrePartida,fillSobre, fillJugador}=this
                this.playerCards=await gamesStore().getPlayerCards({nombrePartida,fillSobre,fillJugador})
              }
              break;
            case 15:
              if(this.jugador==1){
                this.fillSobre='sobre3'
                this.fillJugador='3'
                var {nombrePartida,fillSobre, fillJugador}=this
                this.playerCards=await gamesStore().getPlayerCards({nombrePartida,fillSobre,fillJugador})
              }else if(this.jugador==2){
                this.fillSobre='sobre3'
                this.fillJugador='4'
                var {nombrePartida,fillSobre, fillJugador}=this
                this.playerCards=await gamesStore().getPlayerCards({nombrePartida,fillSobre,fillJugador})
              }else if(this.jugador==3){
                this.fillSobre='sobre3'
                this.fillJugador='1'
                var {nombrePartida,fillSobre, fillJugador}=this
                this.playerCards=await gamesStore().getPlayerCards({nombrePartida,fillSobre,fillJugador})
              }else{
                this.fillSobre='sobre3'
                this.fillJugador='2'
                var {nombrePartida,fillSobre, fillJugador}=this
                this.playerCards=await gamesStore().getPlayerCards({nombrePartida,fillSobre,fillJugador})
              }
              break;
            case 16:
              if(this.jugador==1){
                this.fillSobre='sobre3'
                this.fillJugador='2'
                var {nombrePartida,fillSobre, fillJugador}=this
                this.playerCards=await gamesStore().getPlayerCards({nombrePartida,fillSobre,fillJugador})
              }else if(this.jugador==2){
                this.fillSobre='sobre3'
                this.fillJugador='3'
                var {nombrePartida,fillSobre, fillJugador}=this
                this.playerCards=await gamesStore().getPlayerCards({nombrePartida,fillSobre,fillJugador})
              }else if(this.jugador==3){
                this.fillSobre='sobre3'
                this.fillJugador='4'
                var {nombrePartida,fillSobre, fillJugador}=this
                this.playerCards=await gamesStore().getPlayerCards({nombrePartida,fillSobre,fillJugador})
              }else{
                this.fillSobre='sobre3'
                this.fillJugador='1'
                var {nombrePartida,fillSobre, fillJugador}=this
                this.playerCards=await gamesStore().getPlayerCards({nombrePartida,fillSobre,fillJugador})
              }
              break;
            default: console.log('estoy en default')
          }
          console.log(this.playerCards,'esto es playerCards')
        },
        async fillCards(){
          var {id}=this
          this.cards=[]
          for(var i=0;i<this.playerCards.length;i++){
            id=this.playerCards[i]
            var card=await cardsStore().getCard({id})
            this.cards.push(card[0])
          }
        },
        async getMazoFinal(){
          var {id}=this
          this.draftMazoFinal=[]
          for(var i=0;i<this.draftMazo.length;i++){
            id=this.draftMazo[i]
            var card=await cardsStore().getCard({id})
            this.draftMazoFinal.push(card[0])
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