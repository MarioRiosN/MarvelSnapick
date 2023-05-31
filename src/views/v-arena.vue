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
          <c-button class="v-arena__button--menu" @click="goMenu(e)" innerText="MENU"></c-button>
        </template>
      </c-header>
    </template>
    <template #title>
      <h1>MODO ARENA</h1>
    </template>
    <template #button>
      <c-button
        v-if="this.arenaCards.length === 0"
        @click="getCode"
        innerText="CÓDIGO DEL MAZO"
      ></c-button>
      <h2>{{ msg }}</h2>
    </template>
    <template #cards>
      <div v-if="this.arenaCards.length !== 0">
        <h1>Pick: {{ this.pick }}/12</h1>
        <c-cards-image
          id="pick1"
          :src="this.arenaCards.at(-1).Img"
          :alt="this.arenaCards.at(-1).CardDefId"
          @click="makePick('pick1')"
        />
        <c-cards-image
          id="pick2"
          :src="this.arenaCards.at(-2).Img"
          :alt="this.arenaCards.at(-2).CardDefId"
          @click="makePick('pick2')"
        />
        <c-cards-image
          id="pick3"
          :src="this.arenaCards.at(-3).Img"
          :alt="this.arenaCards.at(-3).CardDefId"
          @click="makePick('pick3')"
        />
      </div>
      <div v-else>
        <c-cards-image
          v-for="card in arenaDeck"
          :key="card.CardDefId"
          :src="card.Img"
          :alt="card.CardDefId"
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
      arenaCards: [],
      arenaDeck: [],
      error: false,
      userLogged: '',
      end: false,
      pick: 1,
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
        for (i = 0; i < 36; i++) {
          this.arenaCards.push(this.cards.pop())
        }
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
    makePick(id) {
      var myObj = {
        'CardDefId': document.getElementById(id).getAttribute('alt'),
        'Img': document.getElementById(id).getAttribute('src')
      }
      this.arenaDeck.push(myObj)
      this.arenaCards.length = this.arenaCards.length - 3
      this.pick++
    },
    getCode() {
      let link =
        "{'Name':'test','Cards':[{'CardDefId':'" +
        this.arenaDeck[0].CardDefId +
        "'},{'CardDefId':'" +
        this.arenaDeck[1].CardDefId +
        "'},{'CardDefId':'" +
        this.arenaDeck[2].CardDefId +
        "'},{'CardDefId':'" +
        this.arenaDeck[3].CardDefId +
        "'},{'CardDefId':'" +
        this.arenaDeck[4].CardDefId +
        "'},{'CardDefId':'" +
        this.arenaDeck[5].CardDefId +
        "'},{'CardDefId':'" +
        this.arenaDeck[6].CardDefId +
        "'},{'CardDefId':'" +
        this.arenaDeck[7].CardDefId +
        "'},{'CardDefId':'" +
        this.arenaDeck[8].CardDefId +
        "'},{'CardDefId':'" +
        this.arenaDeck[9].CardDefId +
        "'},{'CardDefId':'" +
        this.arenaDeck[10].CardDefId +
        "'},{'CardDefId':'" +
        this.arenaDeck[11].CardDefId +
        "'}]}"
      this.codigoMazo = window.btoa(link)
      navigator.clipboard.writeText(this.codigoMazo)
      this.msg = 'Código copiado'
    },
    shuffleCards(array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1))
        var temp = array[i]
        array[i] = array[j]
        array[j] = temp
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
.v-arena__button--menu {
  max-width: 80px;
  max-height: 40px;
  border-radius: 5px;
  background-color: var(--color-button);
  color: var(--color-background-light);
  font-weight: bold;
  display: flex;
  justify-content: center;
}
</style>
