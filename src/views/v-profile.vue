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
            class="v-profile__button--menu"
            @click="goPlace('menu')"
            innerText="MENÚ"
          ></c-button>
        </template>
      </c-header>
    </template>
    <template #title>
      <h1>PERFIL</h1>
      <div class="v-profile" v-if="msg !== undefined">
        <span class="v-profile--msg">{{ msg }}</span>
      </div>
    </template>
    <template #button>
      <c-button
        class="v-profile__button--option"
        @click="goPlace('rename')"
        innerText="CAMBIAR NOMBRE"
      ></c-button>
      <c-button
        class="v-profile__button--option"
        @click="goPlace('repassword')"
        innerText="CAMBIAR CONTRASEÑA"
      ></c-button>
      <c-button
        class="v-profile__button--option"
        @click="goPlace('collection')"
        innerText="COLECCIÓN"
      ></c-button>
    </template>
  </l-options>
</template>

<script>
import LOptions from '../layouts/l-options.vue'
import CHeader from '../components/c-header.vue'
import CUser from '../components/c-user.vue'
import CIcon from '../components/c-icon.vue'
import CButton from '../components/c-button.vue'
import { userStore } from '../stores/user'

export default {
  components: {
    LOptions,
    CHeader,
    CUser,
    CButton,
    CIcon
  },
  data() {
    return {
      userLogged: ''
    }
  },
  props: {
    msg: {
      type: String,
      required: false
    }
  },
  methods: {
    async loadUser() {
      this.userLogged = userStore().userLogged
    },
    goPlace(place) {
      this.$router.push({ name: place })
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
  }
}
</script>

<style lang="scss" scoped>
.v-profile__button--menu {
  max-width: 80px;
  max-height: 40px;
  border-radius: 5px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  font-size: medium;
}

.v-profile__button--option {
  height: 80%;
  border-radius: 10px;
  width: 20%;
  font-weight: bold;
  font-size: x-large;
  word-wrap: break-word;
}
</style>
