<template>
    <l-options>
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
              class="v-draft__button--menu"
              @click="goMenu"
              innerText="MENU"
            ></c-button>
          </template>
        </c-header>
      </template>
      <template #title>
        <h1>DRAFT</h1>
      </template>
      <template #button>
        <c-button
          class="v-draft__button--option"
          @click="createDraft()"
          innerText="Crear Draft"
        ></c-button>
        <div class="v-draft__button--option">
            <c-button
                class="v-draft__button--option2"
                innerText="Unirse Draft"
            ></c-button>
            <c-text-field placeholder="Nombre Partida" v-model="nombrePartida"></c-text-field>
        </div>
      </template>
    </l-options>
</template>

<script>
import LOptions from '../layouts/l-options.vue'
import CHeader from '../components/c-header.vue'
import CUser from '../components/c-user.vue'
import CIcon from '../components/c-icon.vue'
import CTextField from '../components/c-text-field.vue'
import CButton from '../components/c-button.vue'
import { userStore } from '../stores/user'
import {gamesStore} from '../stores/games'

export default {
  components: {
    LOptions,
    CHeader,
    CUser,
    CTextField,
    CButton,
    CIcon
  },
  data() {
    return {
      userLogged: '',
      nombrePartida:''
    }
  },
  methods: {
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
    async createDraft(){
        try{
            const {userLogged}=this
            const createDraft = await gamesStore().createDraft({userLogged})
        } catch(e){
            console.log(e)
        }
    }
},
created() {
    this.loadUser()
}
}
</script>

<style lang="scss" scoped>
.v-draft__button--menu {
  max-width: 80px;
  max-height: 40px;
  border-radius: 5px;
  font-weight: bold;
  text-align: center;
  display: flex;
  justify-content: center;
  font-size: medium;
}
.v-draft__button--option {
  height: 80%;
  border-radius: 10px;
  width: 20%;
  font-weight: bold;
  font-size: x-large;
}
.v-draft__button--option2 {
  height: 100%;
  border-radius: 10px;
  width: 100%;
  font-weight: bold;
  font-size: x-large;
}
</style>

