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
          <c-button class="v-sealed__button--menu" @click="goMenu(e)" innerText="MENU"></c-button>
        </template>
      </c-header>
    </template>
    <template #title>
      <h1>MODO SELLADO</h1>
    </template>
    <template #button>
      <c-button
        v-if="this.selladoCards.length !== 0"
        @click="nextSobre"
        innerText="SIGUIENTE"
      ></c-button>
      <c-button v-else @click="getCode" innerText="CÓDIGO DEL MAZO"></c-button>
      <h2>{{ msg }}</h2>
    </template>
    <template #cards>
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
  data() {
    return {
      cards: [],
      selladoCards: [],
      selladoDeck: [],
      error: false,
      userLogged: '',
      end: false,
      sobre: 1,
      codigoMazo: '',
      msg: ''
    }
  },
  methods: {
    async loadCards() {
      try {
        const useCardsStore = cardsStore()
        this.cards = await useCardsStore.fetchCards()
        this.fetched = true
        this.shuffleCards(this.cards)
        let i = 0
        for (i = 0; i < 18; i++) {
          this.selladoCards.push(this.cards.pop())
        }
        this.selladoDeck = this.selladoCards.slice()
        for (let i = 0; i < 18; i++) {
          this.selladoDeck[i].have = 'false'
        }
        console.log(this.selladoDeck)
      } catch (e) {
        console.log(e)
        this.error = true
      }
    },
    async loadUser() {
      this.userLogged = userStore().userLogged
    },
    goMenu() {
      this.$router.push({ name: 'menu' })
    },
    nextSobre() {
      this.sobre++
      this.selladoCards.length = this.selladoCards.length - 6
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
    shuffleCards(array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1))
        var temp = array[i]
        array[i] = array[j]
        array[j] = temp
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
    this.loadCards()
    this.loadUser()
  }
}
</script>

<style lang="scss">
.v-sealed__button--menu {
  max-width: 80px;
  max-height: 40px;
  border-radius: 5px;
  font-weight: bold;
  text-align: center;
  display: flex;
  justify-content: center;
  font-size: medium;
}

.notHave {
  filter: grayscale(100%);
}
</style>
