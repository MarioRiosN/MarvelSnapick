<template>
  <div class="c-header">
    <slot v-if="$slots.user" name="user" />
    <img
      class="c-header__image"
      src="../assets/logo.png"
      alt="Marvel SnaPick"
    />
    <div class="c-header__button--wrapper" v-if="$slots.buttonMenu">
      <slot name="buttonMenu" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CHeader'
}
</script>

<style>
.c-header {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}
.c-header__image {
  position: absolute;
  right: 0;
  left: 0;
  margin: auto;
  /* top: 0, left: 50% , transform: translate(-50%,0%); es otra forma de centrarlo*/
  height: 80px;
}
.c-header__button--wrapper {
  display: flex;
  justify-content: end;
  width: 150px;
}
</style>
