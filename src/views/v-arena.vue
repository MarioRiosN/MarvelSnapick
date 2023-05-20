<template>
  <l-centered>
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
    <template #cardsArena>
      <div v-if="this.arenaCards.length !== 0">
        <h1>Pick: {{ this.pick }}/12</h1>
        <img
          id="pick1"
          :src="this.arenaCards.at(-1).Img"
          :alt="this.arenaCards.at(-1).CardDefId"
          @click="makePick('pick1')"
        />
        <img
          id="pick2"
          :src="this.arenaCards.at(-2).Img"
          :alt="this.arenaCards.at(-2).CardDefId"
          @click="makePick('pick2')"
        />
        <img
          id="pick3"
          :src="this.arenaCards.at(-3).Img"
          :alt="this.arenaCards.at(-3).CardDefId"
          @click="makePick('pick3')"
        />
      </div>
      <div v-else>
        <h1>{{ codigoMazo }}</h1>
      </div>
    </template>
  </l-centered>
</template>

<script>
import LCentered from '../layouts/l-centered.vue'
import CHeader from '../components/c-header.vue'
import CUser from '../components/c-user.vue'
import CIcon from '../components/c-icon.vue'
import CButton from '../components/c-button.vue'
import CCardsImage from '../components/c-cards-image.vue'
import { userStore } from '../stores/user'
import { cardsStore } from '../stores/cards'

export default {
  components: {
    LCentered,
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
      codigoMazo: ''
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
    /* async startMode() {
      this.pick = 1
      this.end = false
    }, */
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
      if (this.pick > 12) {
        /* for (var i = 0; i < 12; i++) {
          link += "{'CardDefId':'" + this.arenaDeck.pop().CardDefId + "'},"
        }
        link += ']}' */
        let link =
          "{'Name':'test','Cards':[{'CardDefId':'" +
          this.arenaDeck.pop().CardDefId +
          "'},{'CardDefId':'" +
          this.arenaDeck.pop().CardDefId +
          "'},{'CardDefId':'" +
          this.arenaDeck.pop().CardDefId +
          "'},{'CardDefId':'" +
          this.arenaDeck.pop().CardDefId +
          "'},{'CardDefId':'" +
          this.arenaDeck.pop().CardDefId +
          "'},{'CardDefId':'" +
          this.arenaDeck.pop().CardDefId +
          "'},{'CardDefId':'" +
          this.arenaDeck.pop().CardDefId +
          "'},{'CardDefId':'" +
          this.arenaDeck.pop().CardDefId +
          "'},{'CardDefId':'" +
          this.arenaDeck.pop().CardDefId +
          "'},{'CardDefId':'" +
          this.arenaDeck.pop().CardDefId +
          "'},{'CardDefId':'" +
          this.arenaDeck.pop().CardDefId +
          "'},{'CardDefId':'" +
          this.arenaDeck.pop().CardDefId +
          "'}]}"
        let codigo = window.btoa(link)
        this.codigoMazo = 'Código del mazo listo: ' + codigo
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
