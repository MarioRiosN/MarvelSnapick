<template>
  <l-admin>
    <template #header>
      <c-header>
        <template #user>
          <c-user :innerText="userLogged">
            <template #icon>
              <c-icon iconName="logout" @click="doLogout" />
            </template>
          </c-user>
        </template>
      </c-header>
    </template>
    <template #users>
      <div class="v-admin--editable">
        <c-text-field id="username_input" placeholder="Usuario" v-model="username" />
        <c-text-field id="rol_input" placeholder="Rol" v-model="rol" />
      </div>
      <div v-for="user in users" class="v-admin--users">
        <span style="width: 34%">
          {{ user.username }}
        </span>
        <span style="width: 34%">
          {{ user.rol }}
        </span>
        <div class="v-admin--users__button" style="width: 32%">
          <c-button innerText="Editar"></c-button>
          <c-button innerText="Borrar" @click="deleteUser(user.username)"></c-button>
        </div>
      </div>
    </template>
    <template #games>
      <div class="v-admin--games">
        <span>ssjlkfafjsfjasjfaj</span>
      </div>
      <div class="v-admin--games">
        <span>ssjlkfafjsfjasjfaj</span>
      </div>
      <div class="v-admin--games">
        <span>ssjlkfafjsfjasjfaj</span>
      </div>
      <div class="v-admin--games">
        <span>ssjlkfafjsfjasjfaj</span>
      </div>
    </template>
  </l-admin>
</template>

<script>
import LAdmin from '../layouts/l-admin.vue'
import CHeader from '../components/c-header.vue'
import CUser from '../components/c-user.vue'
import CTextField from '../components/c-text-field.vue'
import CIcon from '../components/c-icon.vue'
import CButton from '../components/c-button.vue'
import { userStore } from '../stores/user'

export default {
  name: 'v-admin',
  components: {
    LAdmin,
    CHeader,
    CUser,
    CTextField,
    CIcon,
    CButton
  },
  data() {
    return {
      users: [],
      username: '',
      password: '',
      rol: ''
    }
  },
  methods: {
    async loadUsers() {
      try {
        const useUserStore = userStore()
        this.users = await useUserStore.fetchUsers()
        this.fetched = true
      } catch (e) {
        console.log(e)
        this.error = true
      }
    },
    async loadUser() {
      this.userLogged = userStore().userLogged
    },
    async deleteUser(username) {
      const { userId } = username
      try {
        const useUserStore = userStore()
        await useUserStore.deleteUser({ userId })
        this.fetched = true
      } catch (e) {
        console.log(e)
        this.error = true
      }
      this.loadUsers()
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
    this.loadUsers()
    this.loadUser()
  }
}
</script>

<style lang="scss" scoped>
.v-admin--editable {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.v-admin--users {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.v-admin--users__button {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
</style>
