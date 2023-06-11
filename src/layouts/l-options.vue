<template>
  <section class="l-options">
    <div class="l-options__header">
      <slot name="header"></slot>
    </div>
    <div class="l-options__title">
      <slot name="title"></slot>
    </div>
    <div class="l-options__button">
      <slot name="button"></slot>
    </div>
  </section>
</template>

<script>
export default {
  name: 'LOptions'
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 650px) {
  .l-options {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 10px;
}

.l-options__header {
  width: 100%;
  height: 20%;
}

.l-options__title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10%;
}
.l-options__button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70%;
  gap: 20px;
}
.l-options__button :slotted(button){
  width: 100%;
}
}

@media screen and (min-width: 650px) {
  .l-options {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 10px;
}

.l-options__header {
  width: 100%;
  height: 20%;
}

.l-options__title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10%;
}
.l-options__button {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70%;
  gap: 20px;
}
}

</style>
