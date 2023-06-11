<template>
  <l-centered>
    <template #header>
      <c-header> </c-header>
    </template>
    <template #title>
      <h1>CAMBIAR NOMBRE</h1>
    </template>
    <template #form>
      <c-text-field placeholder="Antiguo Nombre" v-model="oldUsername" />
      <c-text-field placeholder="Nuevo Nombre" v-model="newUsername" />
      <div class="v-rename">
        <span class="v-rename--error" v-if="errorVisibility">{{ errorMessage }}</span>
      </div>
    </template>
    <template #button>
      <c-button @click="doRename" innerText="CONFIRMAR"></c-button>
      <c-button @click="cancelRename" innerText="CANCELAR"></c-button>
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
    CHeader
  },
  data() {
    return {
      oldUsername: '',
      newUsername: '',
      userLogged:'',
      errorVisibility: false,
      errorMessage: 'El antiguo nombre no coincide!!!'
    }
  },
  methods: {
    async loadUser() {
      this.userLogged = userStore().userLogged
    },
    async doRename() {
      try {
        const { userLogged, oldUsername, newUsername } = this

        const doRename = await userStore().rename({userLogged, oldUsername, newUsername })

        if (doRename) {
          this.$router.push({
            name: 'profile',
            params: { msg: 'Se ha cambiado el nombre de usuario' }
          })
        } else {
          this.sendError()
        }
      } catch (error) {
        console.log(error)
      }
    },

    cancelRename() {
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
