<template>
  <section class="l-centered">
    <div class="l-centered__header">
      <slot name="header"></slot>
    </div>
    <div l-centered__title>
      <slot name="title"></slot>
    </div>
    <div class="l-centered__grid">
      <div class="l-centered__cards">
        <slot name="cards"></slot>
      </div>
      <div class="l-centered__form">
        <slot name="form"></slot>
      </div>
      <div class="l-centered__button">
        <slot name="button"></slot>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'LCentered'
}
</script>

<style lang="scss">
.l-centered {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 10px;
}

.l-centered__header {
  width: 100%;
  height: 15%;
}

.l-centered__title {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10%;
  font-size: larger;
  font-weight: bold;
}

.l-centered__grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 75%;
  width: 100%;
  gap: 10px;
  overflow-x: scroll;
}

.l-centered__form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40%;
  gap: 10px;
  margin: 20px;
}

.l-centered__button {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 40%;
  gap: 20px;
}

.l-centered__cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  width: 100%;
}

::-webkit-scrollbar {
  display: none;
}
</style>
