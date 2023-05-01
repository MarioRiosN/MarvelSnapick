<template>
    <span class="c-user" :innerText="innerText"></span>
</template>

<script>
export default {
    name: 'CUser',

    props: {
        innerText:{
            type:String,
            default:''
        }
    }
}
</script>

<style>
.c-user {
    font-weight: bold;
    width: 150px;
    text-transform: uppercase;
    font-size: larger;
}
</style>