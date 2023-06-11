<template>
  <button class="c-button" :id="id" :innerText="innerText"></button>
</template>

<script>
export default {
  name: 'CButton',
  props: {
    id: {
      type: String,
      default: ''
    },
    innerText: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.c-button {
  padding: 5px;
  color: var(--color-background-dark);
  border-radius: 5px;
  padding: 10px 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0px 4px 8px 0 var(--color-button-hover);
  outline: none;
  background: radial-gradient(circle, var(--color-button-light) 0%, var(--color-button-dark) 100%);
  border: none;
}

.c-button:hover {
  box-shadow: 0px 4px 6px 0 rgba(255, 255, 255, 0.5), 0px -4px 6px 0 rgba(116, 125, 136, 0.5),
    inset 0px -4px 6px 0 rgba(255, 255, 255, 0.2), inset 0px 4px 6px 0 rgba(0, 0, 0, 0.4);
  background: var(--color-button-hover);
  color: var(--color-font-button-hover);
}
</style>
