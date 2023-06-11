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
          <c-button
            class="v-collection__button--menu"
            @click="goProfile"
            innerText="PERFIL"
          ></c-button>
        </template>
      </c-header>
    </template>
    <template #title>
      <h1>COLECCIÓN</h1>
    </template>
    <template #cards>
      <c-cards-image
        v-for="card in cards"
        :key="card.CardDefId"
        :src="card.Img"
        :alt="card.CardDefId"
      ></c-cards-image>
      <div v-if="error">
        <span>Ha habido un error al cargar las cartas.</span>
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
      error: false,
      userLogged: ''
    }
  },
  methods: {
    async loadCards() {
      try {
        const useCardsStore = cardsStore()
        this.cards = await useCardsStore.fetchCards()
        console.log(this.cards)
      } catch (e) {
        console.log(e)
        this.error = true
      }
    },
    async loadUser() {
      this.userLogged = userStore().userLogged
    },

    goProfile() {
      this.$router.push({ name: 'profile' })
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
.v-collection__button--menu {
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
