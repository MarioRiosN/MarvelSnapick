<template>
  <l-centered>
    <template #header>
      <c-header> </c-header>
    </template>
    <template #title>
      <h1>CAMBIAR CONTRASEÑA</h1>
    </template>
    <template #form>
      <c-text-field placeholder="Antigua Contraseña" v-model="oldPassword" />
      <c-text-field placeholder="Nueva Contraseña" v-model="newPassword" />
      <div class="v-repassword">
        <span class="v-repassword--error" v-if="errorVisibility">{{ errorMessage }}</span>
      </div>
    </template>
    <template #button>
      <c-button @click="doRepassword" innerText="CONFIRMAR"></c-button>
      <c-button @click="cancelRepassword" innerText="CANCELAR"></c-button>
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
  name: 'v-repassword',
  components: {
    LCentered,
    CTextField,
    CButton,
    CHeader
  },
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      errorVisibility: false,
      errorMessage: 'La antigua contraseña no coincide!!!'
    }
  },
  methods: {
    async loadUser() {
      this.userLogged = userStore().userLogged
    },
    async doRepassword() {
      try {
        const { userLogged, oldPassword, newPassword } = this

        const doRepassword = await userStore().repassword({ userLogged, oldPassword, newPassword })

        if (doRepassword) {
          this.$router.push({
            name: 'profile',
            params: { msg: 'Se ha cambiado la contraseña exitosamente' }
          })
        } else {
          this.sendError()
        }
      } catch (error) {
        console.log(error)
      }
    },

    cancelRepassword() {
      this.$router.push({ name: 'profile' })
    },
    sendError() {
      this.errorVisibility = true
      setTimeout(() => {
        this.errorVisibility = false
      }, 5000)
    }
  },
  created() {
    this.loadUser()
  }
}
</script>
