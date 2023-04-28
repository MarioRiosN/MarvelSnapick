<template>
    <img class="c-cards-image" :src="src" :alt="alt">
</template>

<script>
export default {
    name: 'CCardsImage',

    props: {
        src: {
            type: String,
            default: ''
        },
        alt: {
            type: String,
            default: ''
        },
    }
}
</script>

<style>
.c-cards-image {
    height: 120px;
}
</style>