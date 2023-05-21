<template>
  <l-centered>
    <template #header>
      <c-header> </c-header>
    </template>
    <template #title>
      <h1>REGISTRO</h1>
    </template>
    <template #form>
      <c-text-field id="username_input" placeholder="Usuario" v-model="username" />
      <c-text-field id="password_input" placeholder="Contraseña" :type="type" v-model="password">
        <template #icon>
          <c-icon iconName="eye" @click="showPassword" />
        </template>
      </c-text-field>
      <div class="v-register">
        <span class="v-register--error" v-if="errorVisibility">{{ errorMessage }}</span>
      </div>
    </template>
    <template #button>
      <c-button @click="doRegister" innerText="CONFIRMAR"></c-button>
      <c-button @click="cancelRegister" innerText="CANCELAR"></c-button>
    </template>
  </l-centered>
</template>

<script>
import LCentered from '../layouts/l-centered.vue'
import CHeader from '../components/c-header.vue'
import CTextField from '../components/c-text-field.vue'
import CIcon from '../components/c-icon.vue'
import CButton from '../components/c-button.vue'
import { userStore } from '../stores/user'

export default {
  name: 'v-register',
  components: {
    LCentered,
    CTextField,
    CIcon,
    CButton,
    CHeader
  },
  data() {
    return {
      username: '',
      password: '',
      errorVisibility: false,
      errorMessage: 'Nombre de Usuario no disponible!!!',
      type: 'password'
    }
  },
  methods: {
    async doRegister() {
      try {
        const { username, password } = this

        const doRegister = await userStore().register({ username, password })

        if (doRegister) {
          const doLogin = await userStore().login({ username, password })
          if (doLogin) {
            this.$router.push({ name: 'collection' })
          } else {
            this.sendError()
          }
        } else {
          this.sendError()
        }
      } catch (error) {
        console.log(error)
      }
    },

    cancelRegister() {
      this.$router.push({ name: 'login' })
    },
    sendError() {
      this.errorVisibility = true
      setTimeout(() => {
        this.errorVisibility = false
      }, 5000)
    },
    showPassword() {
      if (this.type === 'password') {
        this.type = 'text'
      } else {
        this.type = 'password'
      }
    }
  }
}
</script>
