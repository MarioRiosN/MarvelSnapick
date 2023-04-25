<template>
    <button class="c-button" :id="id" :innerText="innerText"></button>
</template>

<script>
export default{
    name: 'CButton',
    props:{
        id:{
            type: String,
            default:'',
        },
        innerText:{
            type: String,
            default:'',
        }
    }
};
</script>

<style>
.c-button{
    background-color: var(--color-button);
    color: var(--color-background-light);
    border: none;
    padding: 5px;
    font-weight: bold;
}
</style>
