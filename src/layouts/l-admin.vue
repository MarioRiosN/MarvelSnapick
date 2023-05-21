<template>
    <section class="l-admin">
    <div class="l-admin__header">
      <slot name="header"></slot>
    </div>
    <div class="l-admin__grid">
      <div class="l-admin--users">
        <slot name="users"></slot>
      </div>
      <div class="l-admin--games">
        <slot name="games"></slot>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'LAdmin'
}
</script>

<style lang="scss">
.l-admin {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 10px;
}

.l-admin__header {
  width: 100%;
  height: 10%;
}

.l-admin__grid {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 90%;
  width: 100%;
  gap: 10px;
  overflow-x: scroll;
}

.l-admin--users{
    display: flex;
    flex-direction: column;
    width: 50%;
}

.l-admin--games{
    display: flex;
    flex-direction: column;
    width: 50%;
}

::-webkit-scrollbar {
  display: none;
}
</style>