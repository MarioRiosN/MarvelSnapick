<template>
  <div class="c-text-field">
    <input
      class="c-text-field__input"
      :id="id"
      :placeholder="placeholder"
      :type="type"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <slot v-if="$slots.icon" name="icon"></slot>
  </div>
</template>

<script>
export default {
  name: 'CTextField',

  props: {
    id: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    modelValue: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue']
}
</script>

<style lang="scss">
.c-text-field {
  display: flex;
  flex-direction: row;
  gap: 5px;
  background-color: var(--color-input);
  color: var(--color-font);
  border-radius: 10px;
  width: 100%;
  height: 2em;
  padding: 5px;
  transition: 0.2s;
}

.c-text-field:hover {
  outline-width: 2px;
  outline-style: solid;
  outline-color: var(--color-button-dark);
}

.c-text-field:focus-within {
  outline: 2px solid var(--color-button);
}

.c-text-field__input {
  background-color: transparent;
  color: var(--color-font);
  border: none;
  width: 100%;
  height: 100%;
}
::placeholder {
  color: var(--color-font);
}

.c-text-field__input:focus {
  outline: none;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  -webkit-text-fill-color: var(--color-font);
  -webkit-box-shadow: 0 0 0px 40rem var(--color-input) inset;
}
</style>
