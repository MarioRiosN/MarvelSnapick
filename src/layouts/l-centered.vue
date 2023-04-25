<template>
  <section class="l-centered">
    <div class="l-centered__header">
      <slot name="header"></slot>
    </div>
    <div class="l-centered__grid">
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
}
.l-centered__header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}
.l-centered__grid {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80%;
  width: 40%;
  gap: 10px;
}
.l-centered__form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 10px;
  margin: 20px;
}
.l-centered__button {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 20px;
}
</style>
