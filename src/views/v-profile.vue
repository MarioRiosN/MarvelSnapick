<template>
    <l-options>
        <template #header>
            <c-header>
                <template #user>
                    <c-user :innerText="userLogged"></c-user>
                </template>
                <template #buttonProfile>
                    <c-button class="v-profile__button--menu" innerText="MENÚ"></c-button>
                </template>
            </c-header>
        </template>
        <template #title>
            <h1>PERFIL</h1>
        </template>
        <template #button>
        <c-button class="v-profile__button--option" innerText="CAMBIAR NOMBRE"></c-button>
        <c-button class="v-profile__button--option" innerText="CAMBIAR CONTRASEÑA"></c-button>
        <c-button class="v-profile__button--option" innerText="COLECCIÓN"></c-button>
        </template>
    </l-options>
</template>

<script>
import LOptions from '../layouts/l-options.vue'
import CHeader from '../components/c-header.vue'
import CUser from '../components/c-user.vue'
import CButton from '../components/c-button.vue'
import { userStore } from '../stores/user'

export default {
    components: {
        LOptions,
        CHeader,
        CUser,
        CButton,
    },
    data() {
        return {
            userLogged: '',
        }
    },
    methods: {
        async loadUser() {
            this.userLogged = userStore().userLogged;
        }
    },
    created() {
        this.loadUser();
    }
}
</script>

<style lang="scss" scoped>
.v-profile__button--menu {
    max-width: 80px;
    max-height: 40px;
    border-radius: 5px;
    background-color: var(--color-button);
    color: var(--color-background-light);
    font-weight: bold;
}
.v-profile__button--option {
    height: 80%;
    border-radius: 10px;
    width: 20%;
}
</style>