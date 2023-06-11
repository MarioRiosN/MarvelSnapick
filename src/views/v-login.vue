<template>
  <l-centered>
    <template #header>
      <c-header> </c-header>
    </template>
    <template #title>
      <h1>INICIAR SESIÓN</h1>
    </template>
    <template #form>
      <div class="v-login" v-if="msg !== undefined">
        <span class="v-login--msg">{{ msg }}</span>
      </div>
      <c-text-field id="username_input" placeholder="Usuario" v-model="username" />
      <c-text-field id="password_input" placeholder="Contraseña" :type="type" v-model="password">
        <template #icon>
          <c-icon iconName="eye" @click="showPassword" />
        </template>
      </c-text-field>
      <div class="v-login">
        <span class="v-login--error" v-if="errorVisibility">{{ errorMessage }}</span>
      </div>
    </template>
    <template #button>
      <c-button @click="doLogin" innerText="CONFIRMAR"></c-button>
      <c-button @click="goRegister" innerText="REGISTRARSE"></c-button>
    </template>
  </l-centered>
</template>

<script>
import LCentered from '../layouts/l-centered.vue'
import CHeader from '../components/c-header.vue'
import CUser from '../components/c-user.vue'
import CTextField from '../components/c-text-field.vue'
import CIcon from '../components/c-icon.vue'
import CButton from '../components/c-button.vue'
import { userStore } from '../stores/user'

export default {
  name: 'v-login',
  components: {
    LCentered,
    CTextField,
    CButton,
    CHeader,
    CUser,
    CIcon
  },
  data() {
    return {
      username: '',
      password: '',
      errorVisibility: false,
      errorMessage: 'Credenciales Incorrectas!!!',
      type: 'password'
    }
  },
  props: {
    msg: {
      type: String,
      required: false
    }
  },
  methods: {
    async doLogin() {
      const { username, password } = this

      const doLogin = await userStore().login({ username, password })

      if (doLogin === 'admin') {
        this.$router.push({ name: 'admin' })
      } else if (doLogin === 'user') {
        this.$router.push({ name: 'menu' })
      } else {
        this.sendError()
      }
    },
    sendError() {
      this.errorVisibility = true
      this.success = false
      setTimeout(() => {
        this.errorVisibility = false
      }, 5000)
    },
    goRegister() {
      this.$router.push({ name: 'register' })
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
