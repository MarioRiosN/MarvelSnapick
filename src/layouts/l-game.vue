<template>
  <section class="l-game">
    <div class="l-game__header">
      <slot name="header"></slot>
    </div>
    <div l-game__title>
      <slot name="title"></slot>
    </div>
    <div class="l-game__grid">
      <div class="l-game__button">
        <slot name="button"></slot>
      </div>
      <div class="l-game__cards">
        <slot name="cards"></slot>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'LGame'
}
</script>

<style lang="scss">
.l-game {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 10px;
}

.l-game__header {
  width: 100%;
  height: 15%;
}

.l-game__title {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10%;
  font-size: larger;
  font-weight: bold;
}

.l-game__grid {
  display: flex;
  flex-direction: row-reverse;
  text-align: center;
  height: 75%;
  width: 100%;
  gap: 10px;
  overflow-x: scroll;
}

.l-game__cards {
  display: grid;
  grid-template-rows: repeat(auto-fill, minmax(200px, 1fr));
  width: 50%;
}

.l-game__button {
  width: 25%;
  gap: 20px;
}

::-webkit-scrollbar {
  display: none;
}
</style>
