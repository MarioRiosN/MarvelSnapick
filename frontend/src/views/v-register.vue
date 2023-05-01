<template>
  <l-centered>
    <template #header>
      <c-header>
      </c-header>
    </template>
    <template #title>
      <h1>REGISTRO</h1>
    </template>
    <template #form>
      <c-text-field id="username_input" placeholder="Usuario" v-model="username" />
      <c-text-field id="password_input" placeholder="Contraseña" :type="type" v-model="password" />
      <!--<div class="v-register">
          <span class="v-register__error" v-if="errorVisibility">{{ errorMessage }}</span>
        </div> -->
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
import CButton from '../components/c-button.vue'
import { userStore } from '../stores/user'

export default {
  name: 'v-register',
  components: {
    LCentered,
    CTextField,
    CButton,
    CHeader,
  },
  data() {
    return {
      username: '',
      password: '',
      /* errorVisibility: false,
      errorMessage: 'Credenciales Incorrectas!!!', */
      type: 'password'
    }
  },
  methods: {
    async doRegister() {
      try {
        const { username, password } = this

        const doRegister = await userStore().register({ username, password })

        if (doRegister) {
          this.$router.push({ name: 'login' })
        } else {
          this.sendError()
        }
      }
      catch (error) {
        console.log(error)
      }
    },

    cancelRegister() {
      this.$router.push({ name: 'login' })
    },
    /* sendError() {
      this.errorVisibility = true
      this.success = false
      setTimeout(() => {
        this.errorVisibility = false
      }, 5000)
    } */
    /* showPassword(){
      this.type='password';
      if(this.type==='password'){
        this.type='text';
      }
    } */
  }
}
</script>