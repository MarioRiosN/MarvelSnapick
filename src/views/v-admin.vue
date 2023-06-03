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
      <div class="v-admin__title">
        <h1>USUARIOS</h1>
        <h3 v-if="msgUsersVisibility">{{ msgUsers }}</h3>
      </div>
      <div v-for="user in users" class="v-admin--elements">
        <span style="width: 30%">
          {{ user.username }}
        </span>
        <span style="width: 30%">
          {{ user.rol }}
        </span>
        <div class="v-admin__button" style="width: 40%">
          <c-button innerText="Editar rol" @click="editRol(user.username,user.rol)"></c-button>
          <c-button v-if="user.rol==='user'" innerText="Borrar" @click="deleteUser(user.username)"></c-button>
        </div>
      </div>
    </template>
    <template #cards>
      <div class="v-admin__title">
        <h1>CARTAS</h1>
        <h3 v-if="msgCardsVisibility">{{ msgCards }}</h3>
      </div>
      <div class="v-admin--editable">
        <c-text-field  placeholder="CardDefId" v-model="CardDefId" />
        <c-text-field  placeholder="series" v-model="series" />
        <c-text-field  placeholder="Img" v-model="Img" />
        <c-button innerText="Añadir Carta" @click="addCard()"></c-button>
      </div>
      <div v-for="card in cards" class="v-admin--elements">
        <span style="width: 30%">
          {{ card.CardDefId }}
        </span>
        <c-text-field :placeholder=card.series.toString() style="width: 30%" v-model="newSeries"></c-text-field>
        <div class="v-admin__button" style="width: 40%">
          <c-button innerText="Editar Series" @click="editSeries(card.CardDefId)"></c-button>
          <c-button innerText="Borrar" @click="deleteCard(card.CardDefId)"></c-button>
        </div>
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
import { cardsStore } from '../stores/cards'

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
      newSeries:'',
      users: [],
      cards: [],
      CardDefId: '',
      series:'',
      Img: '',
      msgCardsVisibility:false,
      msgUsersVisibility:false,
      msgCards:'',
      msgUsers:''
    }
  },
  methods: {
    async loadUsers(msg) {
      try {
        const useUserStore = userStore()
        this.users = await useUserStore.fetchUsers()
      } catch (e) {
        console.log(e)
      }
      this.msgUsers=msg
      this.msgUsersVisibility=true
      setTimeout(() => {
        this.msgUsersVisibility = false
      }, 5000)
    },
    async loadUser() {
      this.userLogged = userStore().userLogged
    },
    async loadCards(msg) {
      try {
        const useCardsStore = cardsStore()
        this.cards = await useCardsStore.fetchCards()
      } catch (e) {
        console.log(e)
        this.error = true
      }
      this.msgCards=msg
      this.msgCardsVisibility=true
      setTimeout(() => {
        this.msgCardsVisibility = false
      }, 5000)
    },
    async editRol(username,rol){
      try{
        const editRol = await userStore().rerol({username,rol})
      }catch(e){
        console.log(e)
      }
      this.loadUsers('Rol cambiado correctamente')
    },
    async deleteUser(username) {
      try {
        const deleteUser = await userStore().deleteUser({ username })
      } catch (e) {
        console.log(e)
      }
      this.loadUsers('Usuario eliminado correctamente')
    },
    async addCard(){
      try{
        const {CardDefId, series, Img}=this
        const addCard= await cardsStore().addCard({CardDefId, series, Img})
      }catch (error){
        console.log(error)
      }
      this.loadCards('Carta añadida correctamente')
    },
    async deleteCard(CardDefId) {
      try {
        const deleteCard = await cardsStore().deleteCard({ CardDefId })
      } catch (e) {
        console.log(e)
      }
      this.loadCards('Carta eliminada correctamente')
    },
    async editSeries(CardDefId){
      const {newSeries} =this
      try{
        const editSeries = await cardsStore().editSeries({CardDefId, newSeries})
      } catch(e){
        console.log(e)
      }
      this.loadCards('Serie editada correctamente')
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
    this.loadUsers('')
    this.loadUser()
    this.loadCards('')
  }
}
</script>

<style lang="scss" scoped>
.v-admin__title{
  display: flex;
  flex-direction: row;
  gap: 50px;
}
.v-admin--editable {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  margin-bottom: 10px;
}

.v-admin--elements {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.v-admin__button {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
</style>
